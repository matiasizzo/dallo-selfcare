#!/usr/bin/env node
/**
 * Import Shopify CSV products into Supabase.
 * Usage: node scripts/import-shopify.mjs
 */
import { createClient } from '@supabase/supabase-js'
import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { fileURLToPath } from 'url'
import path from 'path'

const SUPABASE_URL = 'https://niuaflxfiyafckvseruu.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdWFmbHhmaXlhZmNrdnNlcnV1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODUzMDM0MiwiZXhwIjoyMDk0MTA2MzQyfQ.OR5PPEq_iFvI3CiFMsWOhvJWpVVXZlIffo_0Nf68nrw'

const CSV_PATH = '/root/.claude/uploads/5d39e765-49e2-4229-ab91-da5c769abe5d/322ea11f-products_export_1.csv'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

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

function parseCsvLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current)
      current = ''
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

  // Handle multi-line CSV fields by joining lines that are part of a quoted field
  let buffer = ''
  let quoteCount = 0
  let headerDone = false
  let headers = []

  for await (const line of rl) {
    buffer = buffer ? buffer + '\n' + line : line
    // Count quotes to detect if we're still inside a quoted field
    quoteCount += (line.match(/"/g) || []).length
    if (quoteCount % 2 === 0) {
      if (!headerDone) {
        headers = parseCsvLine(buffer)
        headerDone = true
      } else {
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
  console.log('Reading CSV...')
  const rows = await readCsv(CSV_PATH)
  console.log(`Parsed ${rows.length} rows`)

  // Fetch existing categories
  const { data: cats } = await supabase.from('categories').select('id, slug, name')
  console.log('Categories:', cats?.map(c => `${c.slug}(${c.id})`).join(', '))

  const catBySlug = {}
  for (const c of cats ?? []) catBySlug[c.slug] = c.id

  // Group rows by Handle (Handle is always in first row for a product)
  const products = {}
  const order = []

  for (const row of rows) {
    const handle = row['Handle']
    if (!handle) continue
    if (!products[handle]) {
      products[handle] = { mainRow: null, images: [] }
      order.push(handle)
    }
    const imgSrc = row['Image Src']
    if (imgSrc) products[handle].images.push(imgSrc)
    // Main row has a Title
    if (row['Title']) products[handle].mainRow = row
  }

  console.log(`Found ${order.length} unique products`)

  let inserted = 0
  let skipped = 0

  for (const handle of order) {
    const { mainRow, images } = products[handle]
    if (!mainRow) { skipped++; continue }
    if (mainRow['Status'] !== 'active') { console.log(`  SKIP (draft): ${handle}`); skipped++; continue }

    const title = mainRow['Title']
    const slug = handle
    const bodyHtml = mainRow['Body (HTML)']
    const description = stripHtml(bodyHtml)
    const tags = mainRow['Tags'] ?? ''
    const priceStr = mainRow['Variant Price'] ?? '0'
    const price = parseFloat(priceStr) || 0
    const price_cents = Math.round(price * 100)
    const compareStr = mainRow['Variant Compare At Price'] ?? ''
    const compareCents = compareStr ? Math.round(parseFloat(compareStr) * 100) : null
    const imageUrl = images[0] ?? null

    // Map category: "Dallo Nutri" → nutri slug, else → skin slug
    const isNutri = tags.toLowerCase().includes('dallo nutri')
    const categorySlug = isNutri ? 'nutri' : 'skin'
    const categoryId = catBySlug[categorySlug] ?? null

    // available_on: always ["both"] so it shows everywhere
    const availableOn = ['both']

    // Check if product already exists (by slug)
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('slug', slug)
      .single()

    let productId

    if (existing?.id) {
      // Update
      const { data: updated, error } = await supabase
        .from('products')
        .update({
          name: title,
          description,
          category_id: categoryId,
          image_url: imageUrl,
          active: true,
          available_on: availableOn,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select('id')
        .single()
      if (error) { console.error(`  ERROR updating ${slug}:`, error.message); skipped++; continue }
      productId = existing.id
      console.log(`  UPDATE: ${title}`)
    } else {
      // Insert
      const { data: inserted_prod, error } = await supabase
        .from('products')
        .insert({
          name: title,
          slug,
          description,
          category_id: categoryId,
          image_url: imageUrl,
          active: true,
          featured: false,
          available_on: availableOn,
        })
        .select('id')
        .single()
      if (error) { console.error(`  ERROR inserting ${slug}:`, error.message); skipped++; continue }
      productId = inserted_prod.id
      console.log(`  INSERT: ${title}`)
    }

    // Upsert default variant
    const { data: existingVariant } = await supabase
      .from('product_variants')
      .select('id')
      .eq('product_id', productId)
      .eq('is_default', true)
      .single()

    if (existingVariant?.id) {
      await supabase
        .from('product_variants')
        .update({
          price_cents,
          compare_at_cents: compareCents,
          active: true,
        })
        .eq('id', existingVariant.id)
    } else {
      await supabase
        .from('product_variants')
        .insert({
          product_id: productId,
          name: 'Default',
          price_cents,
          compare_at_cents: compareCents,
          is_default: true,
          active: true,
          stock_quantity: 100,
        })
    }

    inserted++
  }

  console.log(`\nDone. Inserted/updated: ${inserted}, skipped: ${skipped}`)
}

main().catch(console.error)
