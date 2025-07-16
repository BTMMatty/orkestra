'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Plus } from 'lucide-react'
import { useCreateAccount } from '@/hooks/useAccounts'

export function CreateAccountDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { user } = useUser()
  const userId = user?.id || ''
  
  // Fix: Use correct React Query mutation properties
  const { mutateAsync: createAccount, isPending: loading } = useCreateAccount()

  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    revenue: '',
    employees: '',
    parent_id: '',
    description: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      await createAccount({
        name: formData.name,
        industry: formData.industry,
        revenue: parseInt(formData.revenue) || 0,
        employees: parseInt(formData.employees) || 0,
        health_score: 75, // Default health score
        parent_id: formData.parent_id || null,
        opportunities_count: 0,
        contacts_count: 0,
        user_id: userId
      })
      
      // Reset form and close dialog
      setFormData({
        name: '',
        industry: '',
        revenue: '',
        employees: '',
        parent_id: '',
        description: ''
      })
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Failed to create account:', error)
    }
  }

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
    'Real Estate',
    'Professional Services',
    'Media & Entertainment',
    'Other'
  ]

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-white text-black px-4 py-2 text-sm font-bold hover:bg-white/90 transition-all"
      >
        <Plus className="w-4 h-4" />
        CREATE ACCOUNT
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black border border-white/20 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">CREATE NEW ACCOUNT</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-1 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Name */}
          <div>
            <label className="block text-sm font-medium mb-2">ACCOUNT NAME *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="TechCorp Solutions"
              className="w-full bg-transparent border border-white/30 p-3 focus:border-white outline-none"
              required
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium mb-2">INDUSTRY *</label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
              className="w-full bg-black border border-white/30 p-3 focus:border-white outline-none"
              required
            >
              <option value="">Select Industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry} className="bg-black">
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* Revenue and Employees */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">ANNUAL REVENUE ($)</label>
              <input
                type="number"
                value={formData.revenue}
                onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                placeholder="50000000"
                className="w-full bg-transparent border border-white/30 p-3 focus:border-white outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">EMPLOYEES</label>
              <input
                type="number"
                value={formData.employees}
                onChange={(e) => setFormData({...formData, employees: e.target.value})}
                placeholder="250"
                className="w-full bg-transparent border border-white/30 p-3 focus:border-white outline-none"
              />
            </div>
          </div>

          {/* Parent Account (for hierarchy) */}
          <div>
            <label className="block text-sm font-medium mb-2">PARENT ACCOUNT (Optional)</label>
            <input
              type="text"
              value={formData.parent_id}
              onChange={(e) => setFormData({...formData, parent_id: e.target.value})}
              placeholder="Leave empty for top-level account"
              className="w-full bg-transparent border border-white/30 p-3 focus:border-white outline-none"
            />
            <div className="text-xs opacity-60 mt-1">
              For subsidiaries or divisions - enter parent account ID
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">DESCRIPTION</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brief description of the account..."
              rows={3}
              className="w-full bg-transparent border border-white/30 p-3 focus:border-white outline-none resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/20">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm border border-white/30 hover:border-white transition-all"
            >
              CANCEL
            </button>
            
            <button
              type="submit"
              disabled={loading || !formData.name || !formData.industry}
              className="px-6 py-2 text-sm bg-white text-black font-bold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}