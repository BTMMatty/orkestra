import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
}

export function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-white'
      case 'down': return 'text-white/60'
      default: return 'text-white/70'
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3" />
      case 'down': return <TrendingDown className="w-3 h-3" />
      default: return null
    }
  }

  return (
    <div className="border border-white/20 p-6 hover:border-white transition-all duration-200 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs opacity-70 tracking-wider">{title}</div>
        {icon && <div className="opacity-50">{icon}</div>}
      </div>
      
      <div className="text-2xl font-bold mb-2 font-mono">{value}</div>
      
      {change && (
        <div className={`text-xs flex items-center gap-1 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span>{change}</span>
        </div>
      )}
    </div>
  )
}