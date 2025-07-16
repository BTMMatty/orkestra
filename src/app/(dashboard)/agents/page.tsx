// src/app/(dashboard)/agents/page.tsx
import { PageHeader } from '@/components/layout/PageHeader'
import { AgentGrid } from '@/components/agents/AgentGrid'
import { AgentOrchestrator } from '@/components/agents/AgentOrchestrator'
import { AgentMetrics } from '@/components/agents/AgentMetrics'

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-black">
      <PageHeader 
        title="AI SQUADRON"
        subtitle="Your neural agents await command"
        actions={
          <button className="bg-white text-black px-6 py-3 font-bold text-sm 
                           hover:scale-105 transition-transform duration-200
                           flex items-center gap-2">
            DEPLOY NEW AGENT
            <span>🤖</span>
          </button>
        }
      />
      
      {/* Agent Metrics */}
      <div className="px-8 pt-8">
        <AgentMetrics />
      </div>

      {/* Agent Orchestrator */}
      <div className="px-8 py-6">
        <AgentOrchestrator />
      </div>

      {/* Active Agents Grid */}
      <div className="px-8 pb-8">
        <h2 className="text-2xl font-bold mb-6">ACTIVE NEURAL AGENTS</h2>
        <AgentGrid />
      </div>
    </div>
  )
}