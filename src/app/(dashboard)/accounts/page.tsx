// src/app/(dashboard)/accounts/page.tsx
import { Suspense } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { AccountList } from '@/components/accounts/AccountList'
import { CreateAccountDialog } from '@/components/accounts/CreateAccountDialog'

export default function AccountsPage() {
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="ENTITY CONTROL"
        subtitle="Command your business empire"
        actions={<CreateAccountDialog />}
      />
      
      <div className="p-8">
        <Suspense fallback={<AccountListSkeleton />}>
          <AccountList />
        </Suspense>
      </div>
    </div>
  )
}

function AccountListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-24 border border-white/20 animate-pulse" />
      ))}
    </div>
  )
}