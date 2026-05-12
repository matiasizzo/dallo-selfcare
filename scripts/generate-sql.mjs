#!/usr/bin/env node
/**
 * Generates SQL INSERT statements from Shopify CSV.
 * Output: scripts/import-products.sql
 * Run the generated SQL in Supabase SQL editor.
 */
import { createReadStream, writeFileSync } from 'fs'
import { createInterface } from 'readline'

const CSV_PATH = '/root/.claire/uploads/5d39e765-49e2-4229-ab91-da5c769abe5d/322ea11f-products_export_1.csv'
const CSV_PATH2 = '/root/.claude/uploads/5d39e765-49e2-4229-ab91-da5c769abe5d/322ea11f-products_export_1.csv'

function stripHtml(html) {
  if (!html) return ''
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function sq(str) {
  if (str === null || str === undefined) return 'NULL'
  return "'" + String(str).replace(/'/g, "''") + "'"
}

function parseCsvLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current); current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

async function readCsv(filePath) {
  const lines = []
  const rl = createInterface({ input: createReadStream(filePath) })
  let buffer = ''
  let quoteCount = 0
  let headerDone = false
  let headers = []

  for await (const line of rl) {
    buffer = buffer ? buffer + '\n' + line : line
    quoteCount += (line.match(/"/g) || []).length
    if (quoteCount % 2 === 0) {
      if (!headerDone) { headers = parseCsvLine(buffer); headerDone = true }
      else {
        const values = parseCsvLine(buffer)
        const row = {}
        headers.forEach((h, i) => { row[h] = values[i] ?? '' })
        lines.push(row)
      }
      buffer = ''
      quoteCount = 0
    }
  }
  return lines
}

async function main() {
  const rows = await readCsv(CSV_PATH2)
  console.log(`Parsed ${rows.length} rows`)

  const products = {}
  const order = []

  for (const row of rows) {
    const handle = row['Handle']
    if (!handle) continue
    if (!products[handle]) { products[handle] = { mainRow: null, images: [] }; order.push(handle) }
    const imgSrc = row['Image Src']
    if (imgSrc) products[handle].images.push(imgSrc)
    if (row['Title']) products[handle].mainRow = row
  }

  const sql = []
  sql.push('-- Dall\'Ó Selfcare — Product import from Shopify CSV')
  sql.push('-- Run this in Supabase SQL editor')
  sql.push('')
  sql.push('DO $$')
  sql.push('DECLARE')
  sql.push('  skin_cat_id uuid;')
  sql.push('  nutri_cat_id uuid;')
  sql.push('  pid uuid;')
  sql.push('BEGIN')
  sql.push('')
  sql.push('  SELECT id INTO skin_cat_id FROM categories WHERE slug = \'skin\' LIMIT 1;')
  sql.push('  SELECT id INTO nutri_cat_id FROM categories WHERE slug = \'nutri\' LIMIT 1;')
  sql.push('')
  sql.push('  IF skin_cat_id IS NULL THEN')
  sql.push('    INSERT INTO categories (name, slug) VALUES (\'Skin\', \'skin\') RETURNING id INTO skin_cat_id;')
  sql.push('  END IF;')
  sql.push('  IF nutri_cat_id IS NULL THEN')
  sql.push('    INSERT INTO categories (name, slug) VALUES (\'Nutri\', \'nutri\') RETURNING id INTO nutri_cat_id;')
  sql.push('  END IF;')
  sql.push('')

  let count = 0
  for (const handle of order) {
    const { mainRow, images } = products[handle]
    if (!mainRow) continue

    const title = mainRow['Title']
    const slug = handle
    const description = stripHtml(mainRow['Body (HTML)'])
    const tags = mainRow['Tags'] ?? ''
    const isNutri = tags.toLowerCase().includes('dallo nutri')
    const price = parseFloat(mainRow['Variant Price'] ?? '0') || 0
    const priceCents = Math.round(price * 100)
    const compareStr = mainRow['Variant Compare At Price'] ?? ''
    const compareCents = compareStr && parseFloat(compareStr) ? Math.round(parseFloat(compareStr) * 100) : null
    const imageUrl = images[0] ?? null
    const catVar = isNutri ? 'nutri_cat_id' : 'skin_cat_id'
    // Import all — mark draft products as inactive
    const active = mainRow['Status'] === 'active'

    sql.push(`  -- ${title}`)
    sql.push(`  INSERT INTO products (name, slug, description, category_id, image_url, active, featured, available_on)`)
    sql.push(`  VALUES (`)
    sql.push(`    ${sq(title)},`)
    sql.push(`    ${sq(slug)},`)
    sql.push(`    ${sq(description)},`)
    sql.push(`    ${catVar},`)
    sql.push(`    ${sq(imageUrl)},`)
    sql.push(`    ${active},`)
    sql.push(`    false,`)
    sql.push(`    ARRAY['both']`)
    sql.push(`  )`)
    sql.push(`  ON CONFLICT (slug) DO UPDATE SET`)
    sql.push(`    name = EXCLUDED.name,`)
    sql.push(`    description = EXCLUDED.description,`)
    sql.push(`    category_id = EXCLUDED.category_id,`)
    sql.push(`    image_url = EXCLUDED.image_url,`)
    sql.push(`    active = EXCLUDED.active,`)
    sql.push(`    available_on = EXCLUDED.available_on`)
    sql.push(`  RETURNING id INTO pid;`)
    sql.push('')
    sql.push(`  INSERT INTO product_variants (product_id, name, price_cents, compare_at_cents, is_default, active, stock_quantity)`)
    sql.push(`  VALUES (pid, 'Default', ${priceCents}, ${compareCents ?? 'NULL'}, true, true, 100)`)
    sql.push(`  ON CONFLICT DO NOTHING;`)
    sql.push('')

    count++
  }

  sql.push('END $$;')
  sql.push('')
  sql.push(`-- Imported ${count} products`)

  const output = sql.join('\n')
  writeFileSync('scripts/import-products.sql', output)
  console.log(`Generated scripts/import-products.sql with ${count} products`)
}

main().catch(console.error)
