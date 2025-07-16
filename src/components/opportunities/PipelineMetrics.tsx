'use client'

import { TrendingUp, TrendingDown, Target, DollarSign, Clock, Award } from 'lucide-react'

export function PipelineMetrics({ filters }: { filters: any }) {
  // Mock data - replace with actual metrics calculation later
  const metrics = {
    totalPipeline: 2400000,
    weightedPipeline: 1600000,
    opportunityCount: 23,
    avgProbability: 67,
    winRate: 72,
    wonDeals: 18,
    closedDeals: 25,
    avgVelocity: 28
  }

  const metricsData = [
    {
      title: 'PIPELINE VALUE',
      value: `$${(metrics.totalPipeline / 1000000).toFixed(1)}M`,
      trend: '+23%',
      icon: DollarSign,
      color: 'text-white'
    },
    {
      title: 'WEIGHTED VALUE',
      value: `$${(metrics.weightedPipeline / 1000000).toFixed(1)}M`,
      trend: '+15%',
      icon: Target,
      color: 'text-white'
    },
    {
      title: 'WIN RATE',
      value: `${metrics.winRate}%`,
      trend: '+5%',
      icon: Award,
      color: 'text-white'
    },
    {
      title: 'AVG VELOCITY',
      value: `${metrics.avgVelocity} DAYS`,
      trend: '-12%',
      icon: Clock,
      color: 'text-white/80'
    },
    {
      title: 'ACTIVE DEALS',
      value: metrics.opportunityCount,
      trend: '+8%',
      icon: TrendingUp,
      color: 'text-white'
    },
    {
      title: 'AVG PROBABILITY',
      value: `${metrics.avgProbability}%`,
      trend: '+3%',
      icon: TrendingUp,
      color: 'text-white/90'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricsData.map((metric, index) => {
          const Icon = metric.icon
          
          return (
            <div 
              key={metric.title}
              className="border border-white/20 p-4 hover:border-white transition-all duration-200 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4 opacity-70" />
                <span className="text-xs opacity-60">{metric.trend}</span>
              </div>
              
              <div className="space-y-1">
                <div className={`text-lg font-bold font-mono ${metric.color}`}>
                  {metric.value}
                </div>
                <div className="text-xs opacity-70 tracking-wider">
                  {metric.title}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="border border-white/20 p-4">
        <h3 className="text-sm font-bold mb-3 opacity-70">PIPELINE HEALTH</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold">{metrics.wonDeals}</div>
            <div className="text-xs opacity-60">DEALS WON</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold">{metrics.closedDeals}</div>
            <div className="text-xs opacity-60">TOTAL CLOSED</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold">
              {Math.round((metrics.wonDeals / metrics.closedDeals) * 100)}%
            </div>
            <div className="text-xs opacity-60">SUCCESS RATE</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold">
              ${(metrics.totalPipeline / metrics.opportunityCount / 1000).toFixed(0)}K
            </div>
            <div className="text-xs opacity-60">AVG DEAL SIZE</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between text-xs opacity-70">
        <span>📊 Metrics updated in real-time</span>
        <span>Filters applied: {JSON.stringify(filters)}</span>
      </div>
    </div>
  )
}