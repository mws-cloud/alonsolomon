# Project Memory - Alon Solomon Law Office Website

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- react-router-dom (client-side routing)
- react-helmet-async (SEO)
- Lucide icons
- Google Fonts: Assistant, Heebo

## Project Structure
- `/src/pages/` - Page components (Index, About, Services, Guides, FAQ, Contact, CaseStudies, NotFound)
- `/src/components/layout/` - Layout, Header, Footer, WhatsAppButton
- `/src/components/home/` - HeroSection, ServicesPreview, CaseStudiesSection, WhyNowSection, PressSection, TestimonialsSection, CTASection
- `/src/components/ui/` - shadcn/ui components
- `/src/components/SEO.tsx` - SEO component using react-helmet-async

## Design Patterns
- RTL layout (dir="rtl", lang="he")
- Color scheme: navy (primary), gold (accent), cream backgrounds
- CSS classes: bg-gradient-navy, text-gold, bg-cream
- Layout wrapper: `<Layout>` component wraps all pages
- SEO: `<SEO>` component per page

## Architecture
- SPA with React Router
- All pages use Layout component (Header + Footer + WhatsApp)
- SEO component handles meta tags per page
- Base URL: https://solomon-law.co.il

## Timeline
- 2026-02-17: Major content update - Adding 18+ new article pages covering all practice areas (clusters 0-5)
