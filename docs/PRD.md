# Product Requirements Document (PRD)

## Banten IT Solutions (BITS) Corporate Platform

| Document Metadata | Details                                       |
| :---------------- | :-------------------------------------------- |
| **Project Name**  | Banten IT Solutions (BITS) Corporate Platform |
| **Domain**        | `bits.co.id`                                  |
| **Version**       | 4.0 (Comprehensive Build)                     |
| **Status**        | **Ready for Development**                     |
| **Author**        | Product Team                                  |
| **Last Updated**  | January 2026                                  |

---

## 1. Executive Summary

**Banten IT Solutions (BITS)** requires a high-performance, secure, and scalable digital headquarters. This project aims to migrate the existing presence to a modern stack (**SvelteKit + Cloudflare + Sanity**) to achieve perfect Core Web Vitals, zero infrastructure costs, and a unified brand image. The platform will showcase 6 distinct service verticals, ranging from "High-End Software Engineering" to "Web Design & Industry Solutions."

---

## 2. Product Principles

1.  **Performance is a Feature:** The site must load in under 1 second. We use Static Generation (SSG) wherever possible.
2.  **Content Velocity:** The Marketing team must be able to publish new case studies or services instantly via Sanity CMS without developer intervention.
3.  **Privacy First:** No intrusive tracking. We use Cloudflare Web Analytics (cookie-free) and Turnstile (privacy-focused CAPTCHA).
4.  **Conversion Focused:** Every page must lead to a specific action (Quote, Call, or Email).

---

## 3. User Stories (Functional Requirements)

### 3.1 Public User (Visitor)

- **US-01:** As a **Startup Founder**, I want to see a clear list of "Launch Services" (MVP, Web Design) so I can quickly estimate costs.
- **US-02:** As a **Corporate CTO**, I want to read deep-dive Case Studies about "Legacy Migration" or "ERP Implementation" to verify technical competence.
- **US-03:** As a **Procurement Manager**, I want to browse a catalog of hardware (Servers, CCTV) and request a bulk quote via a dedicated form.
- **US-04:** As a **User**, I want the website to load instantly on my mobile device, even with a poor 4G connection.

### 3.2 Content Editor (Internal)

- **US-05:** As a **Marketing Admin**, I want to drag-and-drop images in Sanity and have them automatically optimized (WebP/AVIF) on the frontend.
- **US-06:** As a **Sales Rep**, I want to receive email notifications immediately when a user submits a contact form, containing the user's "Service Interest" and "Budget".

---

## 4. Detailed Feature Specifications

### 4.1 Global Navigation

- **Header:** Sticky/Fixed. Glassmorphism effect.
  - Logo (SVG).
  - Mega Menu "Services":
    - _Web Design & Industry Solutions_ (New)
    - _Custom Software Development_
    - _ERP Systems_
    - _AI & Automation_
    - _IT Infrastructure_
    - _Creative Services_
  - Links: Portfolio, About, Blog.
  - Language Switcher: Toggle between `id` and `en` (URL-based: `/id/` ↔ `/en/`)
  - CTA Button: "Get a Quote" (Primary Color).
- **Footer:**
  - Quick Links.
  - Social Media Icons.
  - Office Address & Map Embed.
  - Legal: Privacy Policy (GDPR/UU PDP).

### 4.1.1 Language Switching

- **Implementation:** URL-based routing via `/[lang]/` dynamic segments
- **Locale Types:** `'id' | 'en'` (defined in `$lib/types/index.ts`)
- **Default:** Indonesian (`id`)
- **Component:** `LanguageSwitcher.svelte` toggles between `/id/` and `/en/` paths
- **Content:** All multilingual content stored in Sanity CMS with locale-specific fields
- **Example:** CMS field structure: `{ "title": { "id": "Beranda", "en": "Home" } }`

### 4.2 Page: Web Design & Industry Solutions (New Vertical)

- **Hero:** "Elevate Your Brand Digital Presence."
- **Sub-Service Cards:**
  1.  **Company Profiles:** Professional branding sites.
  2.  **E-Commerce:** Shopify/WooCommerce setup + Payment Gateway integration (Midtrans/Xendit).
  3.  **Real Estate Portals:** Listing search, Map integration, Agent profiles.
  4.  **Hotel Systems:** Booking engine UI, Room availability calendars.
- **Value Prop:** "Pixel Perfect," "SEO Optimized," "Mobile First."

### 4.3 Interactive Contact Forms

- **Logic:** Dynamic fields based on "Inquiry Type".
  - `Software`, `Hardware`, `Web Design`, `ERP`, `AI`, `Other`
  - _If "Hardware"_ -> Show "Quantity" and "Specs".
  - _If "Software"_ -> Show "Tech Stack Preference" (Optional) and "Timeline".
- **Security:** Cloudflare Turnstile widget required before "Submit" button becomes active.
  - Test key for development: `0x4AAAAAAACEIn84L8pN--7921SPbxZKaInI`
  - Production key in `TURNSTILE_SECRET_KEY` environment variable
- **Feedback:** Show JSON response `{ success: true, message: "..." }` upon submission.
- **API Endpoint:** `POST /api/contact` (Cloudflare Function, not prerendered)
- **Email Service:** Resend API for sending form submissions to admin email
- **Rate Limiting:** 5 requests per IP per minute (in-memory for development)

---

## 5. Data Model & CMS Schema (Sanity.io)

This section defines the content structure for the developers to build in Sanity Studio.

### 5.1 Document: `project` (Case Studies)

| Field Name   | Type   | Description                                      |
| :----------- | :----- | :----------------------------------------------- |
| `title`      | String | Project name.                                    |
| `slug`       | Slug   | URL friendly ID (e.g., /portfolio/lumbung-erp).  |
| `client`     | String | Client name.                                     |
| `mainImage`  | Image  | Hero image for the case study.                   |
| `categories` | Array  | Ref to `category` (e.g., "ERP", "Web Design").   |
| `techStack`  | Array  | List of strings (e.g., "Svelte", "Go", "Cisco"). |
| `challenge`  | Text   | The problem statement.                           |
| `solution`   | Text   | How BITS solved it.                              |
| `result`     | Text   | Quantitative results (e.g., "50% faster").       |

### 5.2 Document: `service`

| Field Name         | Type   | Description            |
| :----------------- | :----- | :--------------------- |
| `title`            | String | e.g., "Web Design".    |
| `icon`             | Image  | SVG icon.              |
| `shortDescription` | String | For the homepage grid. |
| `features`         | Array  | List of bullet points. |

### 5.3 Document: `post` (Blog/Insights)

| Field Name    | Type         | Description           |
| :------------ | :----------- | :-------------------- |
| `title`       | String       | Article title.        |
| `author`      | Reference    | Link to `teamMember`. |
| `publishedAt` | Datetime     | Date of publication.  |
| `body`        | PortableText | Rich text content.    |

---

## 6. Technical Architecture & Stack

### 6.1 Frontend (SvelteKit)

- **Framework:** SvelteKit ^2.50.1.
- **Component Framework:** Svelte ^5.48.5 (Runes mode: `$state`, `$derived`, `$effect`, `$props`).
- **Adapter:** `@sveltejs/adapter-static` (^3.0.10) with `strict: false`.
- **Styling:** Tailwind CSS ^4.1.18 with Vite plugin.
- **Icons:** `lucide-svelte` ^0.563.0 (tree-shakeable).

### 6.2 Backend (Serverless & Functions)

- **Platform:** Cloudflare Pages Functions (SvelteKit API routes).
- **API Routes:**
  - `POST /api/contact` - Contact form submission
  - `POST /api/newsletter` - Newsletter subscription
- **Contact Form Flow:**
  - **Step 1:** Validate `turnstile_token` with Cloudflare verify API (`https://challenges.cloudflare.com/turnstile/v0/siteverify`).
  - **Step 2:** Check rate limiting (5 requests per IP per minute).
  - **Step 3:** Validate form data with Zod schema.
  - **Step 4:** Sanitize inputs (HTML tag removal).
  - **Step 5:** Call Resend API (`POST https://api.resend.com/emails`) to send email to admin.
  - **Step 6:** Return JSON `{ success: true, message: "..." }`.
- **Security Headers:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`.

### 6.3 Deployment Pipeline (CI/CD)

1.  **Code Push:** Developer pushes to GitHub `main` branch.
2.  **Build:** Cloudflare Pages detects commit -> Runs `pnpm install && pnpm build`.
3.  **Sanity Webhook:** (Optional) When Content Editor clicks "Publish" in Sanity -> Webhook hits Cloudflare Deploy Hook -> Rebuilds site (Time: ~40s).

---

## 7. Performance & SEO Requirements

### 7.1 Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 1.2s (Mobile).
- **CLS (Cumulative Layout Shift):** 0.00 (Strict).
- **INP (Interaction to Next Paint):** < 100ms.

### 7.2 SEO Implementation

- **Sitemap:** Auto-generated at build time (`sitemap.xml`).
- **Robots.txt:** Allow indexing.
- **Structured Data (JSON-LD):**
  - `Organization` schema on Homepage.
  - `Service` schema on Service Pages.
  - `Article` schema on Blog posts.
- **Open Graph:** Dynamic OG Images generated using Cloudflare Workers or static designs in Sanity.

---

## 8. Analytics & Monitoring

- **Cloudflare Web Analytics:**
  - Enable SPA (Single Page App) support.
  - Track "Core Web Vitals" metrics.
- **Custom Events:**
  - `contact_form_submit`
  - `brochure_download`
  - `whatsapp_click`

---

## 9. Security Requirements

- **Headers:**
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-XSS-Protection: 1; mode=block`
- **Input Validation:**
  - Client-side: Zod schema validation
  - Server-side: HTML tag sanitization (remove `<[^>]*>`), Zod schema re-validation
- **Rate Limiting:**
  - In-memory store for development: 5 requests per IP per minute
  - Cloudflare WAF recommended for production
- **CAPTCHA:**
  - Cloudflare Turnstile (test key for development, production key for deployment)
  - Token validation with Cloudflare API before processing form
- **Environment Variables:**
  - Secrets stored in Cloudflare Pages environment variables
  - No hardcoded credentials in source code

---

## 10. Development Roadmap

| Phase       | Task                     | Deliverable                                                            |
| :---------- | :----------------------- | :--------------------------------------------------------------------- |
| **Phase 0** | **Initialization**       | GitHub Repo, Sanity Project created, Cloudflare Project linked.        |
| **Phase 1** | **CMS Structure**        | Define Schema in Sanity (Projects, Services, Blog).                    |
| **Phase 2** | **Frontend Core**        | Layout, Header, Footer, Hero Components (Svelte).                      |
| **Phase 3** | **Pages Implementation** | Connect Sanity data to Svelte pages (`+page.server.ts` or `+page.ts`). |
| **Phase 4** | **Backend Logic**        | Implement Cloudflare Function for Email & Turnstile.                   |
| **Phase 5** | **Content Entry**        | Input initial portfolio and service descriptions.                      |
| **Phase 6** | **QA & Launch**          | Lighthouse audit, Mobile testing, DNS Switch to `bits.co.id`.          |

---
