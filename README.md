# 🛒 E-Commerce Platform

A modern, full-stack e-commerce platform built with Next.js 15, featuring a headless CMS, secure authentication, cart management, and payment processing.

## 🚀 Features

### 🛍️ Core E-Commerce
- **Product Catalog**: Browse products with categories, search, and filtering
- **Shopping Cart**: Add/remove items, quantity management, persistent cart
- **Secure Checkout**: Stripe payment integration with success handling
- **User Authentication**: Sign up, sign in, session management
- **User Reviews**: Product rating and review system
- **Order Management**: Order history and tracking
- **Wishlist**: Save products for later

### 🎨 User Experience
- **Responsive Design**: Mobile-first, optimized for all devices
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Performance**: Optimized with Next.js 15 and Turbopack
- **Analytics**: Umami analytics integration
- **SEO Optimized**: Server-side rendering and meta optimization

### 🔧 Technical Features
- **Headless CMS**: Sanity CMS for content management
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand for cart and wishlist
- **Type Safety**: Full TypeScript implementation
- **Real-time**: Live cart updates and inventory management

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Custom components with Lucide React icons
- **State Management**: Zustand
- **TypeScript**: Full type safety

### Backend
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Custom session-based auth with Oslo crypto
- **Payments**: Stripe
- **CMS**: Sanity

### Infrastructure
- **Analytics**: Umami
- **Deployment**: Vercel-ready
- **Image Optimization**: Next.js Image with Sanity CDN

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── api/               # API routes
│   │   ├── category/          # Category pages
│   │   ├── product/           # Product detail pages
│   │   ├── checkout/          # Checkout flow
│   │   └── ...
│   ├── components/            # Reusable UI components
│   │   ├── auth/             # Authentication components
│   │   ├── cart/             # Shopping cart components
│   │   ├── layout/           # Layout components
│   │   ├── product/          # Product-related components
│   │   └── ui/               # Base UI components
│   ├── actions/               # Server actions
│   ├── lib/                   # Utilities and configurations
│   ├── sanity/               # Sanity CMS configuration
│   └── stores/               # Zustand stores
├── prisma/                    # Database schema and migrations
├── docs/                      # Project documentation
└── public/                    # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Sanity account
- Stripe account (for payments)
- Umami account (for analytics)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce"

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_READ_TOKEN="your_read_token"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Authentication
AUTH_SECRET="your_secret_key"

# Umami Analytics
UMAMI_WEBSITE_ID="your_website_id"
UMAMI_API_URL="https://your-umami-instance.com"
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

Detailed documentation is available in the `/docs` folder:

- [Architecture Overview](./docs/architecture.md)
- [Authentication System](./docs/authentication.md)
- [Cart Management](./docs/cart-system.md)
- [Navigation Components](./docs/navigation-components.md)
- [Sanity CMS Setup](./docs/sanity-cms.md)
- [Umami Analytics](./docs/umami-setup.md)

## 🔐 Database Schema

### Core Models

- **User**: User accounts with authentication
- **Session**: User sessions for authentication
- **Cart**: Shopping cart with line items
- **CartLineItem**: Individual cart items
- **Review**: Product reviews and ratings

## 🧪 Testing & Development

### Available Scripts

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Prisma commands
npx prisma studio          # Database GUI
npx prisma generate        # Generate Prisma client
npx prisma db push         # Push schema changes
```

### Test Files

The project includes various test scripts:

- `test-checkout.js` - Checkout flow testing
- `test-sanity.js` - Sanity CMS testing
- `test-stripe-checkout.mjs` - Stripe integration testing
- `test-umami.mjs` - Analytics testing

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support and questions:

- Check the [documentation](./docs/)
- Open an issue on GitHub
- Review existing issues and discussions

## 🔧 Configuration

### Sanity CMS
Configure your Sanity studio at `/studio` route for content management.

### Stripe Payments
Test payments using Stripe test cards and webhook endpoints.

### Analytics
Monitor user behavior and site performance with Umami analytics.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
