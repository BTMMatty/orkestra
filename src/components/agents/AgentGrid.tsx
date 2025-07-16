// src/components/agents/AgentGrid.tsx
'use client'

import { useState } from 'react'
import { 
  Brain, 
  TrendingUp, 
  FileText, 
  Search, 
  Zap,
  AlertTriangle,
  Calendar,
  Target
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  type: 'analyzer' | 'predictor' | 'automator' | 'monitor'
  status: 'active' | 'processing' | 'idle' | 'error'
  tasksCompleted: number
  accuracy: number
  lastAction: string
  icon: React.ReactNode
  capabilities: string[]
}

const AGENTS: Agent[] = [
  {
    id: 'deal-predictor',
    name: 'DEAL PREDICTOR',
    type: 'predictor',
    status: 'active',
    tasksCompleted: 1247,
    accuracy: 87,
    lastAction: 'Predicted 78% win probability for Acme Corp deal',
    icon: <TrendingUp className="w-6 h-6" />,
    capabilities: ['Win probability', 'Deal scoring', 'Risk analysis']
  },
  {
    id: 'note-analyzer',
    name: 'NOTE ANALYZER',
    type: 'analyzer',
    status: 'processing',
    tasksCompleted: 3891,
    accuracy: 92,
    lastAction: 'Extracted 5 action items from meeting notes',
    icon: <FileText className="w-6 h-6" />,
    capabilities: ['Sentiment analysis', 'Action extraction', 'Summary generation']
  },
  {
    id: 'lead-scorer',
    name: 'LEAD SCORER',
    type: 'analyzer',
    status: 'active',
    tasksCompleted: 892,
    accuracy: 85,
    lastAction: 'Scored 23 new leads, 4 marked as hot',
    icon: <Target className="w-6 h-6" />,
    capabilities: ['Lead qualification', 'Intent detection', 'Fit scoring']
  },
  {
    id: 'task-automator',
    name: 'TASK AUTOMATOR',
    type: 'automator',
    status: 'active',
    tasksCompleted: 567,
    accuracy: 94,
    lastAction: 'Created follow-up tasks for 12 opportunities',
    icon: <Zap className="w-6 h-6" />,
    capabilities: ['Task creation', 'Workflow automation', 'Smart scheduling']
  },
  {
    id: 'anomaly-detector',
    name: 'ANOMALY DETECTOR',
    type: 'monitor',
    status: 'idle',
    tasksCompleted: 234,
    accuracy: 91,
    lastAction: 'No anomalies detected in last 24 hours',
    icon: <AlertTriangle className="w-6 h-6" />,
    capabilities: ['Pattern detection', 'Risk alerts', 'Behavioral analysis']
  },
  {
    id: 'meeting-scheduler',
    name: 'MEETING SCHEDULER',
    type: 'automator',
    status: 'active',
    tasksCompleted: 445,
    accuracy: 96,
    lastAction: 'Scheduled 3 demos for next week',
    icon: <Calendar className="w-6 h-6" />,
    capabilities: ['Calendar optimization', 'Timezone handling', 'Conflict resolution']
  }
]

export function AgentGrid() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  const statusColors = {
    active: 'border-white text-white',
    processing: 'border-white/70 text-white/70 animate-pulse',
    idle: 'border-white/30 text-white/30',
    error: 'border-red-500 text-red-500'
  }

  const statusLabels = {
    active: 'ONLINE',
    processing: 'WORKING',
    idle: 'STANDBY',
    error: 'ERROR'
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AGENTS.map(agent => (
          <div
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className={`
              border ${statusColors[agent.status]} p-6 cursor-pointer
              hover:border-white hover:bg-white/5 transition-all duration-200
              ${selectedAgent?.id === agent.id ? 'bg-white/10' : ''}
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {agent.icon}
                <div>
                  <h3 className="font-bold">{agent.name}</h3>
                  <div className="text-xs opacity-50 uppercase">
                    {agent.type}
                  </div>
                </div>
              </div>
              <div className={`text-xs font-mono ${statusColors[agent.status]}`}>
                {statusLabels[agent.status]}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Tasks</span>
                <span className="font-mono">{agent.tasksCompleted.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Accuracy</span>
                <span className="font-mono">{agent.accuracy}%</span>
              </div>

              <div className="pt-3 border-t border-white/20">
                <div className="text-xs opacity-50 mb-1">LAST ACTION</div>
                <div className="text-xs line-clamp-2">
                  {agent.lastAction}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Agent Detail Panel */}
      {selectedAgent && (
        <AgentDetailPanel 
          agent={selectedAgent} 
          onClose={() => setSelectedAgent(null)} 
        />
      )}
    </>
  )
}

function AgentDetailPanel({ agent, onClose }: { 
  agent: Agent
  onClose: () => void 
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
      <div 
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      
      <div className="relative bg-black border-2 border-white w-full max-w-2xl">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {agent.icon}
              <div>
                <h2 className="text-2xl font-bold">{agent.name}</h2>
                <div className="text-sm opacity-70">
                  Neural Agent ID: {agent.id}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-2xl hover:bg-white/10 px-3 py-1"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold mb-3 opacity-70">CAPABILITIES</h3>
            <div className="flex flex-wrap gap-2">
              {agent.capabilities.map(cap => (
                <span 
                  key={cap}
                  className="px-3 py-1 border border-white/30 text-sm"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold mb-3 opacity-70">PERFORMANCE</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm opacity-50">Tasks/Hour</span>
                  <span className="font-mono">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-50">Avg Response</span>
                  <span className="font-mono">230ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-50">Uptime</span>
                  <span className="font-mono">99.9%</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-3 opacity-70">RECENT TASKS</h3>
              <div className="space-y-2 text-sm opacity-70">
                <div>• Analyzed Q3 pipeline trends</div>
                <div>• Predicted deal outcomes for 5 opps</div>
                <div>• Generated weekly forecast report</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/20">
            <button className="flex-1 bg-white text-black py-3 font-bold
                           hover:scale-105 transition-transform">
              CONFIGURE AGENT
            </button>
            <button className="flex-1 border border-white/30 py-3
                           hover:border-white transition-colors">
              VIEW LOGS
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}