import { Building2, Users, DollarSign, Globe, Phone, MapPin } from 'lucide-react'

interface AccountDetailProps {
  account: any
}

export function AccountDetail({ account }: AccountDetailProps) {
  return (
    <div className="border border-white/20 p-6">
      <div className="flex items-center gap-4 mb-6">
        <Building2 className="w-6 h-6" />
        <h2 className="text-2xl font-bold">{account.name}</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <div className="text-sm opacity-70">Industry</div>
          <div>{account.industry || 'N/A'}</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm opacity-70 flex items-center gap-2">
            <Users className="w-4 h-4" /> Employees
          </div>
          <div>{account.employees?.toLocaleString() || 'N/A'}</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm opacity-70 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Revenue
          </div>
          <div>${(account.revenue / 1000000)?.toFixed(1)}M</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm opacity-70 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Website
          </div>
          <a href={account.website} className="text-white/70 hover:text-white">
            {account.website || 'N/A'}
          </a>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm opacity-70 flex items-center gap-2">
            <Phone className="w-4 h-4" /> Phone
          </div>
          <div>{account.phone || 'N/A'}</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm opacity-70 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Address
          </div>
          <div>{account.billing_street || 'N/A'}</div>
        </div>
      </div>
    </div>
  )
}