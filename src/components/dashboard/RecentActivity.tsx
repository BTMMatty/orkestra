'use client'

import { Clock, User, Target, Building2, TrendingUp } from 'lucide-react'

interface Activity {
  id: string
  type: 'account' | 'opportunity' | 'contact' | 'pipeline' | 'deal'
  title: string
  description: string
  timestamp: string
  user: string
  value?: string
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'account': return <Building2 className="w-4 h-4" />
    case 'opportunity': return <Target className="w-4 h-4" />
    case 'contact': return <User className="w-4 h-4" />
    case 'pipeline': return <TrendingUp className="w-4 h-4" />
    case 'deal': return <Target className="w-4 h-4" />
    default: return <Clock className="w-4 h-4" />
  }
}

export function RecentActivity() {
  const mockActivities: Activity[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'TechCorp Enterprise Deal',
      description: 'Moved to negotiation stage',
      timestamp: '2 min ago',
      user: 'M.Adams',
      value: '$250K'
    },
    {
      id: '2',
      type: 'account',
      title: 'Acme Corporation',
      description: 'New contact added: John Smith (CTO)',
      timestamp: '8 min ago',
      user: 'Agent.Neural',
      value: undefined
    },
    {
      id: '3',
      type: 'pipeline',
      title: 'Q3 Forecast',
      description: 'Pipeline analysis completed',
      timestamp: '15 min ago',
      user: 'Agent.Predict',
      value: '$2.4M'
    },
    {
      id: '4',
      type: 'deal',
      title: 'CloudSync Solutions',
      description: 'Deal closed - won',
      timestamp: '1 hour ago',
      user: 'M.Adams',
      value: '$85K'
    },
    {
      id: '5',
      type: 'contact',
      title: 'Sarah Wilson',
      description: 'Email response received',
      timestamp: '2 hours ago',
      user: 'Agent.Monitor',
      value: undefined
    }
  ]

  return (
    <div className="border border-white/20 p-6 hover:border-white transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">RECENT ORCHESTRATIONS</h3>
        <button className="text-xs opacity-70 hover:opacity-100 transition-opacity">
          VIEW ALL
        </button>
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-start gap-3 p-3 hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-white/10"
          >
            <div className="flex-shrink-0 mt-1 opacity-70">
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{activity.title}</span>
                {activity.value && (
                  <span className="text-xs bg-white/10 px-2 py-1 font-mono">
                    {activity.value}
                  </span>
                )}
              </div>
              
              <p className="text-xs opacity-70 mb-1">{activity.description}</p>
              
              <div className="flex items-center gap-2 text-xs opacity-50">
                <span>{activity.user}</span>
                <span>•</span>
                <span>{activity.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="text-xs opacity-70 text-center">
          🔥 <span className="font-bold">24</span> actions orchestrated today
        </div>
      </div>
    </div>
  )
}