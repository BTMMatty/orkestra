'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  AlertTriangle,
  Zap
} from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

// Temporary formatCurrency
const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value)

const STAGES = [
  { id: 'prospecting', name: 'PROSPECTING', color: 'border-white/30' },
  { id: 'qualification', name: 'QUALIFICATION', color: 'border-white/40' },
  { id: 'proposal', name: 'PROPOSAL', color: 'border-white/50' },
  { id: 'negotiation', name: 'NEGOTIATION', color: 'border-white/70' },
  { id: 'closing', name: 'CLOSING', color: 'border-white' },
]

interface Opportunity {
  id: string
  name: string
  account: { id: string; name: string }
  value: number
  probability: number
  stage: string
  close_date: string
  owner: { id: string; full_name: string }
  health_score: number
  next_action: string
}

export function OpportunityPipeline({ filters, userId }: { filters: any, userId: string }) {
  const queryClient = useQueryClient()

  const { data: opportunities, isLoading: loading } = useQuery({
    queryKey: ['opportunities', userId, filters],
    queryFn: async () => {
      let query = supabase.from('opportunities').select('*').eq('user_id', userId)
      // Filters (expand as needed)
      if (filters.minValue > 0) query = query.gte('value', filters.minValue)
      const { data, error } = await query
      if (error) throw error
      return data
    },
    enabled: !!userId
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, stage }: { id: string; stage: string }) => {
      const { data, error } = await supabase.from('opportunities').update({ stage }).eq('id', id).select().single()
      if (error) throw error
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['opportunities'] })
  })

  const [draggingId, setDraggingId] = useState<string | null>(null)

  if (loading) return <div>Orchestrating pipeline...</div>

  const opportunitiesByStage = STAGES.reduce((acc, stage) => {
    acc[stage.id] = (opportunities || []).filter(opp => opp.stage === stage.id)
    return acc
  }, {} as Record<string, Opportunity[]>)

  const stageMetrics = STAGES.map(stage => ({
    ...stage,
    count: opportunitiesByStage[stage.id].length,
    totalValue: opportunitiesByStage[stage.id].reduce((sum, opp) => sum + opp.value, 0),
    weightedValue: opportunitiesByStage[stage.id].reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0)
  }))

  const handleDragEnd = async (result: any) => {
    setDraggingId(null)
    if (!result.destination || result.source.droppableId === result.destination.droppableId) return
    await updateMutation.mutateAsync({ id: result.draggableId, stage: result.destination.droppableId })
  }

  return (
    <div>
      {/* Stage Metrics */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {stageMetrics.map(stage => (
          <div key={stage.id} className={`border ${stage.color} p-4`}>
            <div className="text-sm font-bold mb-1">{stage.name}</div>
            <div className="text-2xl font-mono mb-1">${(stage.weightedValue / 1000000).toFixed(1)}M</div>
            <div className="text-xs opacity-70">{stage.count} OPPORTUNITIES</div>
          </div>
        ))}
      </div>

      {/* Kanban */}
      <DragDropContext onDragStart={(r) => setDraggingId(r.draggableId)} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-5 gap-4 min-h-[600px]">
          {STAGES.map(stage => (
            <Droppable key={stage.id} droppableId={stage.id}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={`border ${stage.color} p-4 ${snapshot.isDraggingOver ? 'bg-white/5' : ''}`}>
                  <h3 className="text-sm font-bold mb-4 opacity-70">{stage.name}</h3>
                  <div className="space-y-3">
                    {opportunitiesByStage[stage.id].map((opp, index) => (
                      <Draggable key={opp.id} draggableId={opp.id} index={index}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`bg-black border border-white/20 p-4 hover:border-white cursor-grab ${snapshot.isDragging ? 'opacity-50' : ''} ${draggingId === opp.id ? 'rotate-2' : ''}`}>
                            <OpportunityCard opportunity={opp} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

function OpportunityCard({ opportunity }: { opportunity: any }) {
  const daysUntilClose = Math.ceil((new Date(opportunity.close_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const urgencyColor = daysUntilClose < 7 ? 'text-white' : daysUntilClose < 30 ? 'text-white/70' : 'text-white/50'

  return (
    <div className="space-y-3">
      <div>
        <h4 className="font-bold text-sm mb-1 line-clamp-1">{opportunity.name}</h4>
        <div className="flex items-center gap-2 text-xs opacity-70">
          <Building2 className="w-3 h-3" />
          <span className="line-clamp-1">{opportunity.account?.name || 'N/A'}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-mono font-bold">{formatCurrency(opportunity.value)}</div>
          <div className="text-xs opacity-50">{opportunity.probability}% CONFIDENCE</div>
        </div>
        <HealthIndicator score={opportunity.health_score || 0} />
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className={`flex items-center gap-1 ${urgencyColor}`}>
          <Calendar className="w-3 h-3" />
          <span>{daysUntilClose}d</span>
        </div>
        {opportunity.next_action && (
          <div className="flex items-center gap-1 opacity-70">
            <Zap className="w-3 h-3" />
            <span className="truncate max-w-[100px]">{opportunity.next_action}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function HealthIndicator({ score }: { score: number }) {
  const [color, Icon] = score >= 80 ? ['text-white', TrendingUp] : score >= 60 ? ['text-white/70', DollarSign] : ['text-white/40', AlertTriangle]
  return (
    <div className={`flex items-center gap-1 ${color}`}>
      <Icon className="w-4 h-4" />
      <span className="text-xs font-mono">{score}%</span>
    </div>
  )
}