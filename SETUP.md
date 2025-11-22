# 🚀 Setup Completo - Christmas Tree PWA

Guida passo-passo per configurare il progetto in locale.

## 📋 Prerequisiti

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** o **pnpm** o **yarn**
- Account **Supabase** (gratuito)
- Account **Google Cloud** (per OAuth)
- Account **GitHub** (per OAuth)

---

## 1️⃣ Clone del Repository

```bash
git clone https://github.com/MicheleJohn/christmas-tree-pwa.git
cd christmas-tree-pwa
```

---

## 2️⃣ Installazione Dipendenze

```bash
npm install
# oppure
pnpm install
# oppure
yarn install
```

---

## 3️⃣ Setup Database (Supabase)

### Crea Progetto Supabase

1. Vai su [supabase.com](https://supabase.com)
2. Clicca "New Project"
3. Scegli nome, password database, regione
4. Attendi creazione progetto (~2 minuti)

### Ottieni Credenziali Database

1. Vai in **Settings** > **Database**
2. Scorri fino a **Connection String**
3. Copia **Connection Pooling** (porta 6543) - questa è `DATABASE_URL`
4. Copia **Direct Connection** (porta 5432) - questa è `DIRECT_URL`

### Applica Schema Database

```bash
# Crea file .env dalla template
cp .env.example .env

# Modifica .env e aggiungi le connection strings di Supabase
# poi esegui:
npm run db:push
```

Questo comando creerà tutte le tabelle necessarie.

---

## 4️⃣ Setup OAuth2

### Google OAuth

1. Vai su [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Crea nuovo progetto (se non ne hai uno)
3. Vai in **APIs & Services** > **Credentials**
4. Clicca **Create Credentials** > **OAuth 2.0 Client ID**
5. Tipo applicazione: **Web application**
6. Aggiungi **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Salva e copia:
   - **Client ID** → `AUTH_GOOGLE_ID` nel `.env`
   - **Client Secret** → `AUTH_GOOGLE_SECRET` nel `.env`

### GitHub OAuth

1. Vai su [GitHub Developer Settings](https://github.com/settings/developers)
2. Clicca **New OAuth App**
3. Compila:
   - **Application name**: Christmas Tree PWA
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Salva e copia:
   - **Client ID** → `AUTH_GITHUB_ID` nel `.env`
   - **Client Secret** → `AUTH_GITHUB_SECRET` nel `.env`

---

## 5️⃣ Genera Chiavi di Sicurezza

### NextAuth Secret

```bash
# Genera chiave casuale
openssl rand -base64 32
```

Copia output in `.env` come `AUTH_SECRET`

### Encryption Master Key

```bash
# Genera altra chiave casuale
openssl rand -base64 32
```

Copia output in `.env` come `ENCRYPTION_MASTER_KEY`

---

## 6️⃣ File .env Finale

Il tuo `.env` dovrebbe essere simile a questo:

```bash
# Database
DATABASE_URL="postgresql://postgres.xxxxx:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxxxx:password@aws-0-eu-central-1.compute.amazonaws.com:5432/postgres"

# NextAuth
AUTH_SECRET="generatedSecret123..."
AUTH_TRUST_HOST=true

# OAuth
AUTH_GOOGLE_ID="123456789-abc.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="GOCSPX-..."
AUTH_GITHUB_ID="Ov23liABC123"
AUTH_GITHUB_SECRET="abc123def456..."

# App
NEXTAUTH_URL=http://localhost:3000

# Encryption
ENCRYPTION_MASTER_KEY="anotherGeneratedSecret456..."
```

---

## 7️⃣ Avvia Server di Sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

---

## 8️⃣ Verifica Installazione

### Checklist

- [ ] Homepage si carica correttamente
- [ ] Cliccando "Inizia Ora" vai a `/login`
- [ ] Bottoni OAuth Google/GitHub sono visibili
- [ ] Cliccando su Google/GitHub vieni reindirizzato
- [ ] Dopo login, vieni reindirizzato a `/tree`
- [ ] Non ci sono errori nella console del browser

### Debug Database

Visualizza il database con Prisma Studio:

```bash
npm run db:studio
```

Dovrebbe aprire http://localhost:5555 con interfaccia grafica del DB.

---

## 9️⃣ Comandi Utili

```bash
# Sviluppo
npm run dev              # Avvia dev server
npm run build            # Build production
npm run start            # Avvia production build
npm run lint             # Run ESLint

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:migrate       # Create migration
npm run db:reset         # Reset database (ATTENZIONE!)
```

---

## 🐛 Troubleshooting

### Errore: "Prisma Client not found"

```bash
npm run postinstall
```

### Errore: "Invalid connection string"

Verifica che:
- Le connection strings in `.env` siano corrette
- Non ci siano spazi extra
- La password non contenga caratteri speciali non escaped

### Errore OAuth: "redirect_uri_mismatch"

Verifica che in Google/GitHub OAuth settings l'URL di redirect sia esattamente:
```
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/github
```

### Errore: "AUTH_SECRET not set"

Genera una nuova chiave:
```bash
openssl rand -base64 32
```
E aggiungila a `.env`

---

## 🚀 Prossimi Passi

1. **Crea il tuo albero** - Vai su `/tree` dopo il login
2. **Invia un regalo** - Usa il form per inviare un regalo di test
3. **Personalizza UI** - Modifica i colori in `tailwind.config.ts`
4. **Aggiungi 3D** - Implementa componenti Three.js in `src/components/three/`
5. **Deploy** - Segui istruzioni in README.md per deploy su Vercel

---

## 📚 Risorse

- [Documentazione Next.js](https://nextjs.org/docs)
- [Documentazione Prisma](https://www.prisma.io/docs)
- [Documentazione NextAuth](https://authjs.dev)
- [Documentazione Supabase](https://supabase.com/docs)
- [Documentazione shadcn/ui](https://ui.shadcn.com)
- [Documentazione React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

---

## ❓ Supporto

Se hai problemi:
1. Controlla la sezione Troubleshooting sopra
2. Verifica che tutte le variabili `.env` siano corrette
3. Apri un issue su GitHub

Buon sviluppo! 🎄🎁
