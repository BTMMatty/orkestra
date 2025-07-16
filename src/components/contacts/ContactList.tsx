'use client'

import { User, Mail, Phone, Briefcase } from 'lucide-react'

interface Contact {
  id: string
  name: string
  title: string
  email: string
  phone?: string
  primary: boolean
}

interface ContactListProps {
  accountId: string
}

export function ContactList({ accountId }: ContactListProps) {
  // Mock data - replace with real Supabase query
  const mockContacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Chief Technology Officer',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      primary: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'VP of Engineering',
      email: 'michael.chen@techcorp.com',
      phone: '+1 (555) 234-5678',
      primary: false
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      title: 'Procurement Manager',
      email: 'emily.rodriguez@techcorp.com',
      primary: false
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">CONTACTS</h3>
        <button className="text-xs border border-white/30 px-3 py-1 hover:border-white transition-all">
          ADD CONTACT
        </button>
      </div>

      {mockContacts.length === 0 ? (
        <div className="border border-white/20 p-8 text-center">
          <User className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <h4 className="font-bold mb-2">NO CONTACTS</h4>
          <p className="text-sm opacity-70">No contacts found for this account</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockContacts.map((contact) => (
            <div key={contact.id} className="border border-white/20 p-4 hover:border-white transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">{contact.name}</h4>
                    {contact.primary && (
                      <span className="text-xs bg-white/20 px-2 py-1">PRIMARY</span>
                    )}
                  </div>
                  <p className="text-sm opacity-70 flex items-center gap-2 mt-1">
                    <Briefcase className="w-3 h-3" />
                    {contact.title}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 opacity-70">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                    {contact.email}
                  </a>
                </div>
                
                {contact.phone && (
                  <div className="flex items-center gap-2 opacity-70">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-white/20 pt-4">
        <div className="text-center text-xs opacity-70">
          {mockContacts.length} contact{mockContacts.length !== 1 ? 's' : ''} • 
          {mockContacts.filter(c => c.primary).length} primary
        </div>
      </div>
    </div>
  )
}