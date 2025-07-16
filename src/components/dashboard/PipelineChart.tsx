'use client'

import { useState } from 'react'

interface PipelineStage {
  name: string
  value: number
  count: number
}

export function PipelineChart() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter'>('month')

  const mockData: PipelineStage[] = [
    { name: 'PROSPECTING', value: 450000, count: 12 },
    { name: 'QUALIFICATION', value: 780000, count: 8 },
    { name: 'PROPOSAL', value: 620000, count: 5 },
    { name: 'NEGOTIATION', value: 340000, count: 3 },
    { name: 'CLOSING', value: 180000, count: 2 },
  ]

  const maxValue = Math.max(...mockData.map(stage => stage.value))

  return (
    <div className="border border-white/20 p-6 hover:border-white transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">PIPELINE VELOCITY</h3>
        
        <div className="flex border border-white/30">
          {(['week', 'month', 'quarter'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 text-xs transition-all ${
                timeframe === period 
                  ? 'bg-white text-black' 
                  : 'hover:bg-white/10'
              }`}
            >
              {period.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {mockData.map((stage, index) => {
          const percentage = (stage.value / maxValue) * 100
          
          return (
            <div key={stage.name} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-mono">{stage.name}</span>
                <div className="text-right">
                  <div className="text-sm font-bold">
                    ${(stage.value / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs opacity-60">
                    {stage.count} DEALS
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-white/10 h-2">
                <div 
                  className="h-full bg-white transition-all duration-1000 ease-out group-hover:bg-white/80"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="text-xs opacity-70">
          Total Pipeline: <span className="font-bold text-white">${(mockData.reduce((sum, stage) => sum + stage.value, 0) / 1000000).toFixed(1)}M</span>
        </div>
      </div>
    </div>
  )
}