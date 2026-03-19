import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
