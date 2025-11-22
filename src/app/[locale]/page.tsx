import { useTranslations } from 'next-intl'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const session = await auth()
  const t = useTranslations('common')

  if (session) {
    redirect('/tree')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold mb-4">
          🎄 {t('appName')}
        </h1>
        <p className="text-xl text-green-100 max-w-2xl mx-auto">
          Crea il tuo albero di Natale 3D virtuale e ricevi regali crittografati dai tuoi amici
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <Link href="/login">
            <Button size="lg" className="text-lg px-8">
              Inizia Ora 🎁
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
