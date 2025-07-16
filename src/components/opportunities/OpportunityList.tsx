'use client'

import { Target, Calendar, DollarSign, User } from 'lucide-react'

interface Opportunity {
  id: string
  name: string
  stage: string
  value: number
  probability: number
  close_date: string
  owner: string
}

interface OpportunityListProps {
  accountId: string
}

export function OpportunityList({ accountId }: OpportunityListProps) {
  // Mock data - replace with real Supabase query
  const mockOpportunities: Opportunity[] = [
    {
      id: '1',
      name: 'Enterprise Platform License',
      stage: 'Negotiation',
      value: 250000,
      probability: 80,
      close_date: '2025-08-15',
      owner: 'M.Adams'
    },
    {
      id: '2', 
      name: 'Professional Services Contract',
      stage: 'Proposal',
      value: 75000,
      probability: 60,
      close_date: '2025-09-01',
      owner: 'Agent.Sales'
    },
    {
      id: '3',
      name: 'Annual Support Renewal',
      stage: 'Closing',
      value: 45000,
      probability: 95,
      close_date: '2025-07-30',
      owner: 'M.Adams'
    }
  ]

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'prospecting': return 'text-white/50'
      case 'qualification': return 'text-white/60'
      case 'proposal': return 'text-white/70'
      case 'negotiation': return 'text-white/80'
      case 'closing': return 'text-white'
      default: return 'text-white/60'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">ACTIVE OPPORTUNITIES</h3>
        <button className="text-xs border border-white/30 px-3 py-1 hover:border-white transition-all">
          CREATE NEW
        </button>
      </div>

      {mockOpportunities.length === 0 ? (
        <div className="border border-white/20 p-8 text-center">
          <Target className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <h4 className="font-bold mb-2">NO OPPORTUNITIES</h4>
          <p className="text-sm opacity-70">No active opportunities for this account</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockOpportunities.map((opp) => (
            <div key={opp.id} className="border border-white/20 p-4 hover:border-white transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold">{opp.name}</h4>
                <span className={`text-xs font-mono ${getStageColor(opp.stage)}`}>
                  {opp.stage.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 opacity-70">
                  <DollarSign className="w-4 h-4" />
                  <span>${(opp.value / 1000).toFixed(0)}K</span>
                  <span>({opp.probability}%)</span>
                </div>
                
                <div className="flex items-center gap-2 opacity-70">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(opp.close_date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-2 opacity-70">
                  <User className="w-4 h-4" />
                  <span>{opp.owner}</span>
                </div>

                <div className="text-right">
                  <span className="text-xs opacity-50">
                    Weighted: ${((opp.value * opp.probability) / 100000).toFixed(0)}K
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-white/20 pt-4">
        <div className="grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <div className="font-bold text-lg">{mockOpportunities.length}</div>
            <div className="opacity-70">ACTIVE</div>
          </div>
          <div>
            <div className="font-bold text-lg">
              ${(mockOpportunities.reduce((sum, opp) => sum + opp.value, 0) / 1000).toFixed(0)}K
            </div>
            <div className="opacity-70">TOTAL VALUE</div>
          </div>
          <div>
            <div className="font-bold text-lg">
              ${(mockOpportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0) / 1000).toFixed(0)}K
            </div>
            <div className="opacity-70">WEIGHTED</div>
          </div>
        </div>
      </div>
    </div>
  )
}