# 🎄 Christmas Tree PWA

> Albero di Natale 3D virtuale con regali crittografati end-to-end

## ✨ Features

- **Albero 3D Interattivo** - Renderizzato con Three.js/React Three Fiber
- **Regali Crittografati** - Privacy garantita con AES-256
- **Foto Crittografate** - Allega immagini ai regali (crittografate end-to-end)
- **OAuth2 Authentication** - Login con Google/GitHub
- **PWA Ready** - Installabile come app nativa
- **Multilingua** - Italiano + English (i18n)
- **Decorazioni Sbloccabili** - Minigiochi natalizi (coming soon)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **3D Engine**: Three.js + React Three Fiber
- **Database**: Supabase PostgreSQL + **Prisma 7** ORM
- **Auth**: NextAuth v5 (Google, GitHub OAuth)
- **UI**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod
- **State**: TanStack Query
- **i18n**: next-intl
- **PWA**: @ducanh2912/next-pwa
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- **pnpm** (Package Manager)
- Supabase account (free tier)
- Google/GitHub OAuth apps

### Installation

```bash
# Clone repository
git clone https://github.com/MicheleJohn/christmas-tree-pwa.git
cd christmas-tree-pwa

# Install dependencies with pnpm
pnpm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Setup database (Prisma 7)
pnpm db:push

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Database Setup

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Get connection strings from Settings > Database
3. Add to `.env`:
   - `DATABASE_URL` (pooled connection - port 6543)
   - `DIRECT_URL` (direct connection - port 5432)
4. Run migrations:

```bash
pnpm db:push
```

## 🔐 OAuth Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID
3. Add authorized redirect: `http://localhost:3000/api/auth/callback/google`
4. Add credentials to `.env`

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create OAuth App
3. Authorization callback: `http://localhost:3000/api/auth/callback/github`
4. Add credentials to `.env`

## 🌐 i18n (Internationalization)

Supported languages:
- 🇮🇹 Italiano (default)
- 🇬🇧 English

Add translations in `src/i18n/locales/{locale}.json`

## 📸 Encrypted Gift Images

Regali possono includere foto crittografate:
- Upload immagine nel form
- Conversione automatica in base64
- Crittografia AES-256 (come per il testo)
- Solo il destinatario con password corretta può vedere l'immagine

## 📝 Project Structure

```
src/
├── app/
│   └── [locale]/          # i18n routes
│       ├── (auth)/         # Auth pages
│       ├── (dashboard)/    # Protected pages
│       └── api/            # API routes
├── components/
│   ├── ui/              # shadcn components
│   ├── three/           # 3D components
│   └── forms/           # Form components
├── lib/                 # Utilities
├── hooks/               # Custom hooks
├── schemas/             # Zod schemas
├── i18n/                # Translations
└── types/               # TypeScript types

prisma/
├── schema.prisma        # Database schema
└── prisma.config.ts     # Prisma 7 config (NEW)
```

## 🔒 Security Features

- **End-to-End Encryption** - Gifts + images encrypted client-side
- **Row Level Security** - Supabase RLS policies
- **OAuth2 Only** - No password storage
- **HTTPS Required** - Automatic on Vercel

## 💻 Development Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Database (Prisma 7)
pnpm db:push      # Push schema changes
pnpm db:studio    # Open Prisma Studio
pnpm db:migrate   # Create migration
pnpm db:reset     # Reset database (ATTENZIONE!)
```

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MicheleJohn/christmas-tree-pwa)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

Ensure all `.env.example` variables are set in Vercel dashboard.

## 📝 License

MIT License - see [LICENSE](LICENSE) file

## 👤 Author

**MicheleJohn**
- GitHub: [@MicheleJohn](https://github.com/MicheleJohn)
- Email: m.troisi1995@gmail.com

## 🤝 Contributing

Contributions welcome! Please open an issue first.

---

Made with ❤️ and ☕ for Christmas 2025 🎄
