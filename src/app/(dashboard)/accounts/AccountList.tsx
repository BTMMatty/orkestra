'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2, ChevronRight, ChevronDown, Users, TrendingUp, AlertTriangle } from 'lucide-react'
import { useAccounts } from '@/hooks/useAccounts'
import { EmptyState } from '@/components/ui/EmptyState'

interface Account {
  id: string
  name: string
  industry: string
  revenue: number
  employees: number
  health_score: number
  parent_id: string | null
  children?: Account[]
  opportunities_count: number
  contacts_count: number
}

export function AccountList() {
  const { user } = useUser()
  const userId = user?.id || ''
  const { data: accounts, isLoading: loading, error } = useAccounts(userId)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  if (loading) return <div>Orchestrating entities...</div>
  if (error) return <div>Entity sync failed. Agents investigating.</div>
  if (!accounts?.length) {
    return (
      <EmptyState
        title="NO ENTITIES DETECTED"
        description="Your empire awaits. Create your first account to begin domination."
        action={{
          label: "CREATE FIRST ENTITY",
          onClick: () => {} // Open create dialog
        }}
      />
    )
  }

  // Build hierarchy - avoid Map type issues with simple object approach
  const accountsWithChildren: Account[] = accounts.map(account => ({
    ...account,
    children: []
  }))

  const accountLookup: { [key: string]: Account } = {}
  const rootAccounts: Account[] = []

  // Create lookup table
  accountsWithChildren.forEach(account => {
    accountLookup[account.id] = account
  })

  // Build hierarchy using object lookup instead of Map
  accountsWithChildren.forEach(account => {
    if (account.parent_id && accountLookup[account.parent_id]) {
      const parent = accountLookup[account.parent_id]
      if (!parent.children) parent.children = []
      parent.children.push(account)
    } else if (!account.parent_id) {
      rootAccounts.push(account)
    }
  })

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedIds(newExpanded)
  }

  const renderAccount = (account: Account, level = 0): React.ReactNode => {
    const hasChildren = account.children && account.children.length > 0
    const isExpanded = expandedIds.has(account.id)
    
    return (
      <div key={account.id}>
        <div 
          className={`
            border border-white/20 p-6 hover:border-white 
            transition-all duration-200 group
            ${level > 0 ? 'ml-12 mt-4' : 'mb-4'}
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {hasChildren && (
                <button
                  onClick={() => toggleExpanded(account.id)}
                  className="p-1 hover:bg-white/10 transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
              
              <Building2 className="w-5 h-5" />
              
              <Link 
                href={`/accounts/${account.id}`}
                className="group-hover:text-glow"
              >
                <h3 className="text-lg font-bold">{account.name}</h3>
              </Link>
              
              <span className="text-xs opacity-50">
                {account.industry.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-6 opacity-70">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{account.contacts_count}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{account.opportunities_count}</span>
                </div>
                
                <div className="text-right">
                  <div className="font-mono">
                    ${(account.revenue / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs opacity-50">
                    {account.employees.toLocaleString()} EMPLOYEES
                  </div>
                </div>
              </div>

              <HealthIndicator score={account.health_score} />
            </div>
          </div>
        </div>

        {isExpanded && hasChildren && account.children && (
          <div className="relative">
            {level === 0 && (
              <div className="absolute left-6 top-0 bottom-0 w-px bg-white/20" />
            )}
            {account.children.map(child => renderAccount(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="border border-white/20 p-4">
          <div className="text-2xl font-bold">{accounts.length}</div>
          <div className="text-xs opacity-70">TOTAL ENTITIES</div>
        </div>
        <div className="border border-white/20 p-4">
          <div className="text-2xl font-bold">
            ${(accounts.reduce((sum, a) => sum + a.revenue, 0) / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs opacity-70">EMPIRE VALUE</div>
        </div>
        <div className="border border-white/20 p-4">
          <div className="text-2xl font-bold">
            {accounts.reduce((sum, a) => sum + a.opportunities_count, 0)}
          </div>
          <div className="text-xs opacity-70">ACTIVE STRIKES</div>
        </div>
        <div className="border border-white/20 p-4">
          <div className="text-2xl font-bold">
            {accounts.length > 0 ? Math.round(accounts.reduce((sum, a) => sum + a.health_score, 0) / accounts.length) : 0}%
          </div>
          <div className="text-xs opacity-70">AVG HEALTH</div>
        </div>
      </div>

      {/* Account Hierarchy */}
      <div>
        {rootAccounts.map(account => renderAccount(account))}
      </div>
    </div>
  )
}

function HealthIndicator({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 80) return 'text-white'
    if (score >= 60) return 'text-white/70'
    return 'text-white/40'
  }

  const getIcon = () => {
    if (score >= 80) return <TrendingUp className="w-4 h-4" />
    if (score >= 60) return <Building2 className="w-4 h-4" />
    return <AlertTriangle className="w-4 h-4" />
  }

  return (
    <div className={`flex items-center gap-2 ${getColor()}`}>
      {getIcon()}
      <span className="font-mono">{score}%</span>
    </div>
  )
}