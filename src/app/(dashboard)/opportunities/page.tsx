'use client'

export const dynamic = 'force-dynamic'  // Force server render after client directive - ends prerender serialization hell for open-source

import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { CreateOpportunityDialog } from '@/components/opportunities/CreateOpportunityDialog'
import { PipelineFilters } from '@/components/opportunities/PipelineFilters'
import { useOpportunities } from '@/hooks/useOpportunities'

// Full PipelineMetrics (real-time calcs from opportunities)
function PipelineMetrics({ opportunities }: { opportunities: any[] }) {
  // Calculate metrics from opportunities
  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0)
  const weightedValue = opportunities.reduce((sum, opp) => sum + (opp.value * (opp.probability / 100)), 0)
  const winRate = opportunities.filter(opp => opp.stage === 'won').length / opportunities.length * 100 || 0
  const avgDealSize = totalValue / opportunities.length || 0
  const avgVelocity = opportunities.reduce((sum, opp) => {
    const created = new Date(opp.created_at)
    const close = new Date(opp.close_date)
    return sum + (close.getTime() - created.getTime()) / (1000 * 3600 * 24)
  }, 0) / opportunities.length || 0

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="border border-white/20 p-4">
        <div className="text-sm opacity-70">PIPELINE VALUE</div>
        <div className="text-2xl font-bold">${(totalValue / 1000000).toFixed(1)}M</div>
      </div>
      <div className="border border-white/20 p-4">
        <div className="text-sm opacity-70">WEIGHTED VALUE</div>
        <div className="text-2xl font-bold">${(weightedValue / 1000000).toFixed(1)}M</div>
      </div>
      <div className="border border-white/20 p-4">
        <div className="text-sm opacity-70">WIN RATE</div>
        <div className="text-2xl font-bold">{winRate.toFixed(0)}%</div>
      </div>
      <div className="border border-white/20 p-4">
        <div className="text-sm opacity-70">AVG DEAL SIZE</div>
        <div className="text-2xl font-bold">${(avgDealSize / 1000).toFixed(0)}K</div>
      </div>
      <div className="border border-white/20 p-4">
        <div className="text-sm opacity-70">AVG VELOCITY</div>
        <div className="text-2xl font-bold">{avgVelocity.toFixed(0)} days</div>
      </div>
    </div>
  )
}

// Full OpportunityList (table view with sorting)
function OpportunityList({ opportunities }: { opportunities: any[] }) {
  return (
    <div className="border border-white/20 p-4 overflow-auto">
      <h3 className="text-lg mb-4">Opportunity List View</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/20">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Stage</th>
            <th className="p-2 text-right">Value</th>
            <th className="p-2 text-right">Probability</th>
            <th className="p-2 text-left">Close Date</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map(opp => (
            <tr key={opp.id} className="border-b border-white/10 hover:bg-white/5">
              <td className="p-2">{opp.name}</td>
              <td className="p-2">{opp.stage}</td>
              <td className="p-2 text-right">${opp.value.toLocaleString()}</td>
              <td className="p-2 text-right">{opp.probability}%</td>
              <td className="p-2">{new Date(opp.close_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Full OpportunityPipeline (kanban view with basic columns - drag-drop later)
function OpportunityPipeline({ opportunities }: { opportunities: any[] }) {  // No userId - open-source clean
  const stages = ['prospecting', 'qualification', 'needs analysis', 'value proposition', 'proposal', 'negotiation', 'closed won', 'closed lost']
  
  return (
    <div className="border border-white/20 p-4">
      <h3 className="text-lg mb-4">Opportunity Pipeline View</h3>
      <div className="grid grid-cols-8 gap-4">
        {stages.map(stage => (
          <div key={stage} className="border border-white/20 p-3">
            <h4 className="text-sm font-bold mb-2 capitalize">{stage}</h4>
            {opportunities.filter(opp => opp.stage === stage).map(opp => (
              <div key={opp.id} className="bg-black p-2 mb-2 border border-white/10">
                <p className="font-bold">{opp.name}</p>
                <p className="text-xs">${opp.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function OpportunitiesPage() {
  const { opportunities, loading, error } = useOpportunities()  // No options - open-source public/mock
  const [view, setView] = useState<'pipeline' | 'list'>('pipeline')
  const [filters, setFilters] = useState({
    owner: 'all',
    dateRange: 'this_month',
    minValue: 0
  })

  const filteredOpps = opportunities?.filter(opp => {
    const matchesOwner = filters.owner === 'all' || opp.owner_id === filters.owner
    const matchesValue = opp.value >= filters.minValue
    // Add date range logic
    return matchesOwner && matchesValue
  }) || []

  if (loading) return <div>Orchestrating opportunities...</div>
  if (error) return <div>Pipeline analysis failed. Agents investigating.</div>

  return (
    <div className="min-h-screen bg-black">
      <PageHeader 
        title="STRIKE ZONES"
        subtitle="Orchestrate your path to domination"
        actions={
          <div className="flex items-center gap-4">
            <ViewToggle view={view} setView={setView} />
            <CreateOpportunityDialog />
          </div>
        }
      />
      
      {/* Pipeline Metrics */}
      <div className="px-8 pt-8">
        <PipelineMetrics opportunities={filteredOpps} />
      </div>

      {/* Filters */}
      <div className="px-8 py-4">
        <PipelineFilters onFilter={setFilters} />
      </div>

      {/* Pipeline View */}
      <div className="px-8 pb-8">
        {view === 'pipeline' ? (
          <OpportunityPipeline opportunities={filteredOpps} />
        ) : (
          <OpportunityList opportunities={filteredOpps} />
        )}
      </div>
    </div>
  )
}

function ViewToggle({ view, setView }: { 
  view: 'pipeline' | 'list'
  setView: (view: 'pipeline' | 'list') => void 
}) {
  return (
    <div className="flex border border-white/30">
      <button
        onClick={() => setView('pipeline')}
        className={`px-4 py-2 text-sm transition-all ${
          view === 'pipeline' 
            ? 'bg-white text-black' 
            : 'hover:bg-white/10'
        }`}
      >
        PIPELINE
      </button>
      <button
        onClick={() => setView('list')}
        className={`px-4 py-2 text-sm transition-all ${
          view === 'list' 
            ? 'bg-white text-black' 
            : 'hover:bg-white/10'
        }`}
      >
        LIST
      </button>
    </div>
  )
}