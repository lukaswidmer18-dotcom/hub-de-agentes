export default function OfficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#111b16' }}>
      {children}
    </div>
  )
}
