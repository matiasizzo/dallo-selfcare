#!/usr/bin/env node
/**
 * Downloads all Shopify CDN images and re-uploads to Supabase Storage.
 * Updates image_url and description in the products table.
 *
 * Run from your local machine (needs internet access):
 *   node scripts/migrate-images.mjs
 */
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://niuaflxfiyafckvseruu.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdWFmbHhmaXlhZmNrdnNlcnV1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODUzMDM0MiwiZXhwIjoyMDk0MTA2MzQyfQ.OR5PPEq_iFvI3CiFMsWOhvJWpVVXZlIffo_0Nf68nrw'
const BUCKET = 'assets'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

function getExtension(url, contentType) {
  if (url.includes('.svg') || contentType?.includes('svg')) return 'svg'
  if (url.includes('.webp') || contentType?.includes('webp')) return 'webp'
  if (url.includes('.png') || contentType?.includes('png')) return 'png'
  if (url.includes('.jpg') || url.includes('.jpeg') || contentType?.includes('jpeg')) return 'jpg'
  return 'jpg'
}

function shopifyUrlToFilename(url, slug) {
  try {
    const u = new URL(url)
    const parts = u.pathname.split('/')
    const original = parts[parts.length - 1].split('?')[0]
    return `products/${slug}/${original}`
  } catch {
    return `products/${slug}/image.jpg`
  }
}

async function downloadAndUpload(url, storagePath, contentType) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buffer = await res.arrayBuffer()

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, {
      contentType: contentType ?? 'image/jpeg',
      upsert: true,
    })

  if (error) throw new Error(`Upload failed: ${error.message}`)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)
  return data.publicUrl
}

async function processProduct(product) {
  let imageUrl = product.image_url
  let description = product.description ?? ''
  let changed = false

  // Migrate main image_url
  if (imageUrl?.includes('cdn.shopify.com')) {
    try {
      const res = await fetch(imageUrl, { method: 'HEAD' })
      const contentType = res.headers.get('content-type') ?? 'image/jpeg'
      const storagePath = shopifyUrlToFilename(imageUrl, product.slug)
      const newUrl = await downloadAndUpload(imageUrl, storagePath, contentType)
      console.log(`  ✓ image: ${storagePath}`)
      imageUrl = newUrl
      changed = true
    } catch (err) {
      console.error(`  ✗ image failed: ${err.message}`)
    }
  }

  // Replace Shopify CDN URLs inside description text
  const shopifyUrlRegex = /https:\/\/cdn\.shopify\.com\/[^\s"')>]+/g
  const matches = [...new Set(description.match(shopifyUrlRegex) ?? [])]

  for (const match of matches) {
    try {
      const res = await fetch(match, { method: 'HEAD' })
      const contentType = res.headers.get('content-type') ?? 'image/jpeg'
      const ext = getExtension(match, contentType)
      const storagePath = shopifyUrlToFilename(match, product.slug)
      const newUrl = await downloadAndUpload(match, storagePath, contentType)
      description = description.replaceAll(match, newUrl)
      console.log(`  ✓ desc img: ${storagePath}`)
      changed = true
    } catch (err) {
      console.error(`  ✗ desc img failed: ${err.message}`)
    }
  }

  if (changed) {
    const { error } = await supabase
      .from('products')
      .update({ image_url: imageUrl, description })
      .eq('id', product.id)

    if (error) console.error(`  ✗ DB update failed: ${error.message}`)
    else console.log(`  ✓ DB updated`)
  } else {
    console.log(`  — no Shopify URLs found`)
  }
}

async function main() {
  console.log('Fetching products from Supabase...')
  const { data: products, error } = await supabase
    .from('products')
    .select('id, slug, image_url, description')
    .order('created_at', { ascending: true })

  if (error) { console.error('Error:', error.message); process.exit(1) }
  console.log(`Found ${products.length} products\n`)

  for (const product of products) {
    console.log(`[${product.slug}]`)
    await processProduct(product)
  }

  console.log('\nDone.')
}

main().catch(console.error)
