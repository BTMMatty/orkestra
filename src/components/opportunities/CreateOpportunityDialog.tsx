'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Plus, Search } from 'lucide-react'
import { useAccounts } from '@/hooks/useAccounts'
import { useCreateOpportunity } from '@/hooks/useCreateOpportunity'

interface CreateOpportunityDialogProps {
  accountId?: string
}

export function CreateOpportunityDialog({ accountId }: CreateOpportunityDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [accountSearch, setAccountSearch] = useState('')
  const router = useRouter()
  
  const { user } = useUser()
  const userId = user?.id || ''
  
  const { createOpportunity, loading } = useCreateOpportunity()
  const { data: accounts } = useAccounts(userId) // Fixed: Use data property

  const [formData, setFormData] = useState({
    name: '',
    account_id: accountId || '',
    stage: 'prospecting',
    value: '',
    probability: '50',
    close_date: '',
    description: ''
  })

  const filteredAccounts = accounts?.filter(a => 
    a.name.toLowerCase().includes(accountSearch.toLowerCase())
  ) || []

  const stages = [
    { value: 'prospecting', label: 'Prospecting' },
    { value: 'qualification', label: 'Qualification' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'closing', label: 'Closing' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await createOpportunity({
        ...formData,
        value: parseFloat(formData.value) || 0,
        probability: parseInt(formData.probability) || 0,
        user_id: userId
      })
      
      setIsOpen(false)
      setFormData({
        name: '',
        account_id: accountId || '',
        stage: 'prospecting',
        value: '',
        probability: '50',
        close_date: '',
        description: ''
      })
      
      router.refresh()
    } catch (error) {
      console.error('Failed to create opportunity:', error)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-white text-black px-4 py-2 text-sm font-bold hover:bg-white/90 transition-all"
      >
        <Plus className="w-4 h-4" />
        CREATE OPPORTUNITY
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black border border-white/20 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">CREATE NEW OPPORTUNITY</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Opportunity Name */}
          <div>
            <label className="block text-sm font-medium mb-2">OPPORTUNITY NAME *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enterprise Platform License"
              className="w-full bg-transparent border border-white/30 p-3 focus:border-white outline-none"
              required
            />
          </div>

          {/* Account Selection */}
          {!accountId && (
            <div>
              <label className="block text-sm font-medium mb-2">ACCOUNT *</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 opacity-50" />
                <input
                  type="text"
                  value={accountSearch}
                  onChange={(e) => setAccountSearch(e.target.value)}
                  placeholder="Search accounts..."
                  className="w-full bg-transparent border border-white/30 p-3 pl-10 focus:border-white outline-none mb-2"
                />
              </div>
              
              {accountSearch && (
                <div className="border border-white/20 max-h-32 overflow-y-auto">
                  {filteredAccounts.map((account) => (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() => {
                        setFormData({...formData, account_id: account.id})
                        setAccountSearch(account.name)
                      }}
                      className="w-full text-left p-3 hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
                    >
                      <div className="font-medium">{account.name}</div>
                      <div className="text-xs opacity-70">{account.industry}</div>
                    </button>
                  ))}
                </div>
              )}
              
              {formData.account_id && !accountSearch && (
                <div className="text-sm opacity-70">
                  Selected: {accounts?.find(a => a.id === formData.account_id)?.name}
                </div>
              )}
            </div>
          )}

          {/* Value and Probability */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">VALUE ($) *</label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                placeholder="250000"
                className="w-full bg-transparent border border-white/30 p-3 focus:border-white outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">PROBABILITY (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData({...formData, probability: e.target.value})}
                className="w-full bg-transparent border border-white/30 p-3 focus:border-white outline-none"
              />
            </div>
          </div>

          {/* Stage and Close Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">STAGE</label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({...formData, stage: e.target.value})}
                className="w-full bg-black border border-white/30 p-3 focus:border-white outline-none"
              >
                {stages.map((stage) => (
                  <option key={stage.value} value={stage.value} className="bg-black">
                    {stage.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">EXPECTED CLOSE DATE</label>
              <input
                type="date"
                value={formData.close_date}
                onChange={(e) => setFormData({...formData, close_date: e.target.value})}
                className="w-full bg-transparent border border-white/30 p-3 focus:border-white outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">DESCRIPTION</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brief description of the opportunity..."
              rows={3}
              className="w-full bg-transparent border border-white/30 p-3 focus:border-white outline-none resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/20">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm border border-white/30 hover:border-white transition-all"
            >
              CANCEL
            </button>
            
            <button
              type="submit"
              disabled={loading || !formData.name || (!accountId && !formData.account_id)}
              className="px-6 py-2 text-sm bg-white text-black font-bold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'CREATING...' : 'CREATE OPPORTUNITY'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}