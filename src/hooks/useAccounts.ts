import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query' // Added useQueryClient import

interface Account {
  id: string
  name: string
  industry: string
  revenue: number
  employees: number
  health_score: number
  parent_id: string | null
  opportunities_count: number
  contacts_count: number
  user_id: string
}

// Mock function - replace with actual Supabase call
async function fetchAccounts(userId: string): Promise<Account[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock data
  return [
    {
      id: '1',
      name: 'TechCorp Solutions',
      industry: 'Technology',
      revenue: 50000000,
      employees: 250,
      health_score: 85,
      parent_id: null,
      opportunities_count: 3,
      contacts_count: 8,
      user_id: userId
    },
    {
      id: '2', 
      name: 'Global Manufacturing Inc',
      industry: 'Manufacturing',
      revenue: 120000000,
      employees: 800,
      health_score: 72,
      parent_id: null,
      opportunities_count: 5,
      contacts_count: 12,
      user_id: userId
    },
    {
      id: '3',
      name: 'StartupXYZ',
      industry: 'Software',
      revenue: 2000000,
      employees: 25,
      health_score: 90,
      parent_id: null,
      opportunities_count: 2,
      contacts_count: 4,
      user_id: userId
    }
  ]
}

export function useAccounts(userId: string) {
  return useQuery({
    queryKey: ['accounts', userId],
    queryFn: () => fetchAccounts(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useCreateAccount() {
  const queryClient = useQueryClient() // Now properly imported

  return useMutation({
    mutationFn: async (data: Omit<Account, 'id'>) => {
      // Mock implementation - replace with actual Supabase call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newAccount: Account = {
        ...data,
        id: Date.now().toString(), // Mock ID generation
      }
      
      console.log('Creating account:', newAccount)
      return newAccount
    },
    onSuccess: (newAccount) => {
      // Invalidate and refetch accounts
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })
}