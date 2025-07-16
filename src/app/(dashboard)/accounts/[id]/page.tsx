'use client'

import { PageHeader } from '@/components/layout/PageHeader'
import { AccountTabs } from '@/components/accounts/AccountTabs'
import { useAccounts } from '@/hooks/useAccounts'
import { useParams } from 'next/navigation'

interface Account {
  id: string
  name: string
  industry: string
  revenue: number
  employees: number
  health_score: number
  parent_id: string | null
  opportunities_count: number
  contacts_count: number
}

export default function AccountDetailPage() {
  const params = useParams()
  const id = params.id as string

  const { data: accounts } = useAccounts()  // No userId - open-source public fetch
  const account = accounts?.find(a => a.id === id) as Account | undefined

  if (!account) return <div>Account not found (mock for open-source dev - add real data)</div>

  return (
    <div className="min-h-screen bg-black">
      <PageHeader 
        title={account.name.toUpperCase()}
        subtitle="Entity command center"
      />
      
      <div className="p-8">
        <AccountTabs account={account} />
      </div>
    </div>
  )
}