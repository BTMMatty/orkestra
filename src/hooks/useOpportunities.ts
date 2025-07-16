import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query' // Added useQueryClient import

interface Opportunity {
  id: string
  name: string
  account_id: string
  stage: string
  value: number
  probability: number
  close_date: string
  owner_id: string
  notes_count: number
  risk_factors: string[]
  user_id: string
}

// Mock function - replace with actual Supabase call
async function fetchOpportunities(userId: string): Promise<Opportunity[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock data
  return [
    {
      id: '1',
      name: 'Enterprise Platform License',
      account_id: '1',
      stage: 'negotiation',
      value: 250000,
      probability: 80,
      close_date: '2025-08-15',
      owner_id: userId,
      notes_count: 12,
      risk_factors: ['Budget approval pending'],
      user_id: userId
    },
    {
      id: '2',
      name: 'Professional Services Contract',
      account_id: '1',
      stage: 'proposal',
      value: 75000,
      probability: 60,
      close_date: '2025-09-01',
      owner_id: userId,
      notes_count: 8,
      risk_factors: ['Timeline concerns'],
      user_id: userId
    },
    {
      id: '3',
      name: 'Annual Support Renewal',
      account_id: '2',
      stage: 'closing',
      value: 45000,
      probability: 95,
      close_date: '2025-07-30',
      owner_id: userId,
      notes_count: 3,
      risk_factors: [],
      user_id: userId
    }
  ]
}

export function useOpportunities(userId?: string) {
  return useQuery({
    queryKey: ['opportunities', userId],
    queryFn: () => fetchOpportunities(userId || ''),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useCreateOpportunity() {
  const queryClient = useQueryClient() // Now properly imported

  return useMutation({
    mutationFn: async (data: Omit<Opportunity, 'id'>) => {
      // Mock implementation - replace with actual Supabase call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newOpportunity: Opportunity = {
        ...data,
        id: Date.now().toString(), // Mock ID generation
      }
      
      console.log('Creating opportunity:', newOpportunity)
      return newOpportunity
    },
    onSuccess: () => {
      // Invalidate and refetch opportunities
      queryClient.invalidateQueries({ queryKey: ['opportunities'] })
    },
  })
}

export function useUpdateOpportunity() {
  const queryClient = useQueryClient() // Now properly imported

  return {
    updateOpportunity: useMutation({
      mutationFn: async ({ id, data }: { id: string, data: Partial<Opportunity> }) => {
        // Mock implementation - replace with actual Supabase call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        console.log('Updating opportunity:', id, data)
        return { id, ...data }
      },
      onSuccess: () => {
        // Invalidate and refetch opportunities
        queryClient.invalidateQueries({ queryKey: ['opportunities'] })
      },
    })
  }
}

export function useDeleteOpportunity() {
  const queryClient = useQueryClient() // Now properly imported

  return useMutation({
    mutationFn: async (id: string) => {
      // Mock implementation - replace with actual Supabase call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Deleting opportunity:', id)
      return id
    },
    onSuccess: () => {
      // Invalidate and refetch opportunities
      queryClient.invalidateQueries({ queryKey: ['opportunities'] })
    },
  })
}