import { useQuery } from '@tanstack/react-query'

interface PipelineMetrics {
  totalPipeline: number
  weightedPipeline: number
  opportunityCount: number
  avgProbability: number
  winRate: number
  wonDeals: number
  closedDeals: number
  avgVelocity: number
}

async function fetchPipelineMetrics(filters: any): Promise<PipelineMetrics> {
  // Mock implementation - replace with actual Supabase query
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock data based on filters
  return {
    totalPipeline: 2400000,
    weightedPipeline: 1600000,
    opportunityCount: 23,
    avgProbability: 67,
    winRate: 72,
    wonDeals: 18,
    closedDeals: 25,
    avgVelocity: 28
  }
}

export function usePipelineMetrics(filters: any) {
  return useQuery({
    queryKey: ['pipeline-metrics', filters],
    queryFn: () => fetchPipelineMetrics(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // 30 seconds
  })
}