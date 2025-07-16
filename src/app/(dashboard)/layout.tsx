import { QueryClient, QueryClientProvider } from '@tanstack/react-query'  // Added for RQ - anti-bloat wrapper
import { Navigation } from '@/components/layout/Navigation'
import { AgentStatus } from '@/components/layout/AgentStatus'

const queryClient = new QueryClient()  // Simple init - forks can customize

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>  // Wrap for RQ hooks - ends prerender hell
      <div className="flex min-h-screen bg-black">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <AgentStatus />
      </div>
    </QueryClientProvider>
  )
}