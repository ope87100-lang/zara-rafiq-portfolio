# Zara Rafiq — Personal Professional Portfolio

A responsive multi-page personal portfolio website for **Zara Rafiq**, built with React, TypeScript, Vite, Tailwind CSS, React Router, Framer Motion, React Hook Form, Zod, and Lucide React.

## Routes
- `/` — Home (hero, focus overview, about preview, interactive capabilities preview, selected projects, education & languages preview, contact callout)
- `/about` — About Me
- `/skills` — Core & Supporting Capabilities
- `/portfolio` — Practical Projects Gallery with category filtering
- `/portfolio/ebay-listing-practice` — Case Study: eBay Listing Practice & Product Research
- `/portfolio/digital-marketing-canva` — Case Study: Digital Marketing & Canva Practice
- `/education` — Education & Languages
- `/contact` — Contact Form & Direct Details
- `/privacy` — Privacy Policy
- `*` — Custom 404 Page

## Local Setup & Commands
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Contact Form Delivery Configuration
By default, the contact form validates inputs with Zod and React Hook Form, includes honeypot spam protection and duplicate-submission prevention, and offers a verified `mailto:zararafiq18@gmail.com` client fallback when no backend endpoint is configured.

To enable direct API delivery (such as Formspree or Web3Forms):
1. Copy `.env.example` to `.env`
2. Set `VITE_CONTACT_ENDPOINT=<your-form-endpoint-url>`
3. Rebuild or restart the dev server (`npm run dev` / `npm run build`).

Never place secret API keys in client-side `.env` variables.

## Deployment
Run `npm run build` to produce the static `dist/` bundle suitable for Vercel (`vercel.json`), Netlify (`public/_redirects`), or Cloudflare Pages (`dist/_redirects`) with full SPA route fallback (`/* -> /index.html`).
