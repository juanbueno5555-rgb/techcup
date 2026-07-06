import { AppShell } from '@/components/app/app-shell'
import { HelpWidget } from '@/components/app/manchas-widget'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell>
      {children}
      <HelpWidget />
    </AppShell>
  )
}
