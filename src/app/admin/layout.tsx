import { ReactNode } from 'react'
import Link from 'next/link'
import { LogOut, LayoutDashboard, Settings } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Payment Progress</h1>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-900 rounded-md bg-gray-100 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 text-gray-500" />
              Dashboard
            </Link>
            <Link
              href="/admin/configuracoes"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-400" />
              Configurações
            </Link>
          </nav>
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 truncate mb-2">
              <span className="truncate">{user.email}</span>
            </div>
            <form action={async () => {
              'use server'
              const supabaseServer = await createClient()
              await supabaseServer.auth.signOut()
              redirect('/admin/login')
            }}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
