// src/components/agents/AgentOrchestrator.tsx
'use client'

import { useState } from 'react'
import { Zap, Brain, ArrowRight } from 'lucide-react'

export function AgentOrchestrator() {
  const [command, setCommand] = useState('')
  const [orchestrating, setOrchestrating] = useState(false)
  const [results, setResults] = useState<any>(null)

  const quickCommands = [
    'Analyze all lost deals this quarter',
    'Predict which deals will close this month',
    'Generate executive summary of pipeline',
    'Find anomalies in account behavior',
    'Optimize meeting schedules for next week'
  ]

  const handleOrchestrate = async () => {
    if (!command) return
    
    setOrchestrating(true)
    setResults(null)

    // Simulate orchestration
    setTimeout(() => {
      setResults({
        agents: ['deal-predictor', 'note-analyzer', 'anomaly-detector'],
        tasks: [
          { agent: 'deal-predictor', action: 'Analyzing deal patterns...', status: 'complete' },
          { agent: 'note-analyzer', action: 'Extracting insights from notes...', status: 'complete' },
          { agent: 'anomaly-detector', action: 'Checking for unusual patterns...', status: 'complete' }
        ],
        summary: 'Orchestration complete. 3 agents deployed, 15 insights generated.',
        insights: [
          'Price objections increased 23% this quarter',
          'Deals with executive engagement close 45% faster',
          'Friday demos have 67% higher close rate'
        ]
      })
      setOrchestrating(false)
    }, 3000)
  }

  return (
    <div className="border border-white/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6" />
        <h3 className="text-xl font-bold">MULTI-AGENT ORCHESTRATOR</h3>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleOrchestrate()}
            placeholder="Command your neural squadron..."
            className="w-full bg-black border border-white/30 px-4 py-3 pr-12
                     focus:border-white outline-none transition-colors"
          />
          <button
            onClick={handleOrchestrate}
            className="absolute right-3 top-3 hover:scale-110 transition-transform"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Commands */}
        <div className="flex flex-wrap gap-2">
          {quickCommands.map((cmd, i) => (
            <button
              key={i}
              onClick={() => setCommand(cmd)}
              className="text-xs px-3 py-1 border border-white/30 
                       hover:border-white hover:bg-white hover:text-black
                       transition-all duration-200"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Orchestration Status */}
        {orchestrating && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 animate-pulse" />
              <span className="text-sm">ORCHESTRATING NEURAL SWARM...</span>
            </div>
            <div className="space-y-2">
              {['Deploying agents...', 'Analyzing data...', 'Generating insights...'].map((status, i) => (
                <div key={i} className="flex items-center gap-2 text-sm opacity-70">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span>{status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {results && !orchestrating && (
          <div className="mt-6 space-y-4">
            <div className="border border-white/20 p-4">
              <h4 className="font-bold mb-2">ORCHESTRATION COMPLETE</h4>
              <p className="text-sm opacity-70 mb-3">{results.summary}</p>
              
              <div className="space-y-2">
                <h5 className="text-sm font-bold opacity-70">KEY INSIGHTS:</h5>
                {results.insights.map((insight: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="opacity-50">•</span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-white text-black py-3 font-bold
                           hover:scale-105 transition-transform duration-200">
              GENERATE FULL REPORT 🔥
            </button>
          </div>
        )}
      </div>
    </div>
  )
}