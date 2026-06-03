# Sipbooker Batch Keeper

Frontend for **Maybach Liquor** — a premium spirits shop with online ordering, limited-edition pre-booking, and an admin back office. Built as a React SPA with mock data (no backend API yet).

**Repository:** [github.com/TristanBrian/sipbooker-batch-keeper](https://github.com/TristanBrian/sipbooker-batch-keeper)  
**Live demo:** [maybach-liquor on Vercel](https://maybach-liquor-q3i7y1kh7-tristanbrians-projects.vercel.app/)

## Features

### Customer

- Browse and filter the shop catalog (prices in KSH)
- Product detail pages, cart, and checkout
- Pre-book limited releases with deposit flow
- Profile and order history (authenticated routes)
- M-Pesa-oriented payment UX in checkout

### Admin

- Dashboard with sales charts and low-stock alerts
- Inventory management
- Orders and payment tracking (including M-Pesa info)

### Auth

- Role-based routes (`customer` vs `admin`) via `ProtectedRoute`
- Session persisted in `localStorage` (demo only — not production auth)

## Tech stack

| Layer | Choice |
|-------|--------|
| Build | [Vite](https://vitejs.dev/) |
| UI | [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| Routing | [React Router](https://reactrouter.com/) v6 |
| Data / state | [TanStack Query](https://tanstack.com/query), React context (`useAuth`, `useCart`) |
| Charts | [Recharts](https://recharts.org/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |

Originally scaffolded with [Lovable](https://lovable.dev/projects/d8227719-9535-4cc6-8043-e277f775f6b2); continued development in this repo.

## Project structure

```
public/                 Static assets
src/
  components/
    admin/              Orders, inventory, M-Pesa UI
    auth/               ProtectedRoute
    layout/             Header, Footer, AdminLayout
    shop/               ProductCard, CartSidebar
    ui/                 shadcn primitives
  hooks/                useAuth, useCart, use-toast
  lib/
    data.ts             Mock products, orders, users
    utils.ts
  pages/                Route screens
  pages/admin/          Dashboard, Inventory, Orders, Payments
  types/                Product, Order, PreOrder, MpesaPayment, User
```

## Getting started

**Requirements:** Node.js 18+ and npm (or [nvm](https://github.com/nvm-sh/nvm))

```sh
git clone https://github.com/TristanBrian/sipbooker-batch-keeper.git
cd sipbooker-batch-keeper
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

## Demo accounts

For local testing only:

| Role | Email | Password |
|------|-------|------------|
| Admin | `admin@maybachliquor.com` | `admin123` |
| Customer | `user@example.com` | `user123` |

## Routes

| Path | Access |
|------|--------|
| `/`, `/shop`, `/product/:id` | Public |
| `/login`, `/signup` | Public |
| `/checkout`, `/prebook`, `/profile`, `/orders` | Customer |
| `/admin`, `/admin/inventory`, `/admin/orders`, `/admin/payments` | Admin |

## Data model

Catalog, orders, and users live in `src/lib/data.ts`. Cart and auth state are client-side. Wiring a real API would replace the helpers in `data.ts` and the simulated delays in `useAuth`.

## Deploy

The app is a static Vite build. Typical flow:

```sh
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host. Environment variables are not required for the current mock-data setup.

## License

Private project — see repository owner for usage terms.
