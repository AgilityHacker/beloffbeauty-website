# 💄 BeloffBeauty - Premium Beauty Services Website

> Professional permanent makeup and advanced facial treatments website built with Next.js 14

🌐 **Live Site**: [beloff.beauty](https://beloff.beauty)

## ✨ Features

- 🎨 Premium responsive design with smooth animations
- 📱 Mobile-first approach with touch-friendly interactions
- 🖼️ Interactive before/after photo gallery with drag slider
- 📅 Advanced booking calendar with time slot management
- ⭐ Client testimonials carousel
- 🛍️ Comprehensive service catalog with pricing
- 🚀 Floating booking button with micro-interactions
- 📊 SEO optimized with structured data
- 🔒 SSL secured with automatic HTTPS
- ⚡ Fast loading with Next.js optimizations

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **Deployment**: Vercel
- **Domain**: Namecheap

## 🚀 Quick Start

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Add custom domain in Vercel dashboard:
   - Go to your project settings
   - Add domain: beloff.beauty
   - Add domain: www.beloff.beauty

### Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=.next
   ```

### Environment Variables

Create a `.env.production` file:
```
NEXT_PUBLIC_API_URL=https://api.beloff.beauty
NEXT_PUBLIC_SITE_URL=https://beloff.beauty
```

## 🌐 DNS Configuration

After deployment, update your Namecheap DNS:

1. Remove existing A record
2. Add new A record pointing to your hosting provider
3. Add CNAME for www subdomain
4. Wait 24-48 hours for DNS propagation

## 📱 Features

- Premium design with smooth animations
- Mobile responsive
- SEO optimized
- Fast loading with Next.js 14
- Interactive booking system
- Beautiful gallery with before/after slider
- Client testimonials
- Service catalog with pricing

## 🛠 Local Development

```bash
npm install
npm run dev
```

Visit: http://localhost:1111