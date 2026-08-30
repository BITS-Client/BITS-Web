# Sanity Scripts

Scripts untuk export, audit, dan import data Sanity CMS.

## 📁 Struktur

```
sanity/scripts/
├── export.mjs      # Export published + raw data dari Sanity ke JSON
├── audit-seed.mjs  # Audit integritas seed data
├── seed.mjs        # Import data dari JSON ke Sanity
├── seed-safe.mjs   # Jalankan audit lalu seed
└── README.md       # Dokumentasi
```

## 🚀 Penggunaan

### Export Data (dari Sanity)

Export semua content dari Sanity CMS ke folder `sanity/data/`:

```bash
export SANITY_TOKEN=your_token_here
pnpm export
```

atau langsung:

```bash
SANITY_TOKEN=skxxxxx pnpm export
```

**Output:**

- `sanity/data/services.json`
- `sanity/data/posts.json`
- `sanity/data/projects.json`
- `sanity/data/categories.json`
- `sanity/data/team.json`
- `sanity/data/clients.json`
- `sanity/data/[singletons].json`
- `sanity/data/all-data.json` (combined)
- `sanity/data/*.raw.json` (versi raw termasuk draft)
- `sanity/data/all-data.raw.json` (combined raw)
- `sanity/data/all-documents.raw.json` (dump seluruh dokumen raw)
- `sanity/data/drafts-data.json` (draft-only seed data)
- `sanity/data/assets-manifest.json` (manifest asset image/file)
- `sanity/data/assets/images/*` (asset image hasil export)
- `sanity/data/assets/files/*` (asset file hasil export)

> Catatan: export sekarang mengunduh **seluruh** asset image/file yang ada di dataset, bukan hanya yang direferensikan dokumen saat ini.

### Audit Seed Data

Validasi struktur, relasi, SEO, slug unik, dan aturan konten pada file per tipe di `sanity/data/*.json`:

```bash
pnpm audit:seed
```

Contoh yang divalidasi:

- koleksi wajib ada (`services`, `posts`, `projects`, dst.)
- singleton wajib ada
- kelengkapan field SEO untuk pages/posts/projects/services
- keunikan slug dan urutan client
- validitas reference (author/client/category)
- kategori sesuai tipe (`blog|both` untuk post, `portfolio|both` untuk project)
- `_key` pada Portable Text blocks/spans

### Seed Data (ke Sanity)

Import data dari file per tipe di `sanity/data/*.json` ke Sanity CMS:

```bash
export SANITY_TOKEN=your_token_here
pnpm seed
```

atau langsung:

```bash
SANITY_TOKEN=skxxxxx pnpm seed
```

#### Opsi Seed

```bash
# Import subset collection/singleton
pnpm seed -- --only=posts
pnpm seed -- --only=clients
pnpm seed -- --only=homePage,aboutPage

# Skip upload/sync assets
pnpm seed -- --skip-assets
pnpm seed -- --only=projects --skip-assets
```

#### Safe Seed (Audit + Seed)

Jalankan audit terlebih dahulu, lalu lanjut import jika audit sukses:

```bash
pnpm seed:safe

# Dengan opsi yang diteruskan ke seed
pnpm seed:safe -- --only=projects --skip-assets
```

## ⚙️ Environment Variables

| Variable       | Required | Description                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------- |
| `SANITY_TOKEN` | ✅ Yes   | Sanity API token dengan permission read (export/audit query ops) atau write (seed) |

## 📋 Content Types

### Documents

- **services** - Layanan IT
- **posts** - Blog posts
- **projects** - Portfolio projects
- **categories** - Blog categories
- **team** - Team members
- **clients** - Clients

### Singletons

- **homePage** - Homepage content
- **aboutPage** - About page content
- **servicesPage** - Services listing page
- **portfolioPage** - Portfolio listing page
- **blogPage** - Blog listing page
- **contactPage** - Contact page
- **termsPage** - Terms of service
- **privacyPage** - Privacy policy

### Settings

- **generalSettings** - General site settings
- **informationSettings** - Company information
- **configuration** - Site configuration
- **menuSettings** - Navigation menu

### Data Identity & Upsert Behavior

- `seed.mjs` melakukan **upsert** (update jika dokumen sudah ada, create jika belum ada)
- Referensi dikonversi menggunakan `_sourceId` untuk menjaga relasi antar dokumen
- ID deterministik menggunakan format published (`<type>-<slug>` atau `<type>-<name>`) agar langsung bisa diakses frontend
- Asset di-resolve via SHA-1 hash agar asset existing bisa direuse

## 🔒 Security Notes

- Jangan commit `SANITY_TOKEN` ke repository
- Gunakan `.env` file untuk development (tapi jangan commit)
- Gunakan environment variables di CI/CD
- Token dengan permission write hanya untuk seed, read untuk export
