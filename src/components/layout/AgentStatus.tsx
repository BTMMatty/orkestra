// src/components/layout/AgentStatus.tsx
'use client'

import { useEffect, useState } from 'react'
import { Activity, Cpu, Zap, AlertTriangle } from 'lucide-react'

interface AgentMetrics {
  online: number
  latency: number
  tasksProcessed: number
  status: 'READY' | 'PROCESSING' | 'ALERT'
}

export function AgentStatus() {
  const [metrics, setMetrics] = useState<AgentMetrics>({
    online: 5,
    latency: 0.3,
    tasksProcessed: 0,
    status: 'READY'
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        latency: 0.2 + Math.random() * 0.3,
        tasksProcessed: prev.tasksProcessed + Math.floor(Math.random() * 3),
        status: Math.random() > 0.8 ? 'PROCESSING' : 'READY'
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const statusColors = {
    READY: 'bg-white',
    PROCESSING: 'bg-white animate-pulse',
    ALERT: 'bg-red-500'
  }

  return (
    <div className="fixed bottom-6 right-6 bg-black border border-white/20 
                  px-6 py-4 flex items-center gap-6 font-mono text-xs">
      {/* Status Indicator */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${statusColors[metrics.status]}`} />
        <span>{metrics.status}</span>
      </div>

      {/* Metrics */}
      <div className="flex items-center gap-6 opacity-70">
        <div className="flex items-center gap-2">
          <Cpu className="w-3 h-3" />
          <span>{metrics.online} AGENTS</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3" />
          <span>{metrics.latency.toFixed(1)}ms</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3" />
          <span>{metrics.tasksProcessed} TASKS</span>
        </div>
      </div>

      {/* Action */}
      <button className="ml-4 text-white/50 hover:text-white transition-colors">
        VIEW ORCHESTRA
      </button>
    </div>
  )
}