'use client'

import { useState } from 'react'
import { Building2, Target, Users, MessageSquare } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import { AccountDetail } from './AccountDetail'
import { OpportunityList as AccountOpportunityList } from '@/components/opportunities/OpportunityList'  // Renamed import
import { ContactList as AccountContactList } from '@/components/contacts/ContactList'  // Renamed import
import { NoteList as AccountNoteList } from '@/components/notes/NoteList'  // Renamed import

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
}

interface AccountTabsProps {
  account: Account
}

export function AccountTabs({ account }: AccountTabsProps) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-transparent border border-white/20">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-white data-[state=active]:text-black text-white border-0"
          >
            <Building2 className="w-4 h-4 mr-2" />
            OVERVIEW
          </TabsTrigger>
          <TabsTrigger 
            value="opportunities" 
            className="data-[state=active]:bg-white data-[state=active]:text-black text-white border-0"
          >
            <Target className="w-4 h-4 mr-2" />
            OPPORTUNITIES ({account.opportunities_count})
          </TabsTrigger>
          <TabsTrigger 
            value="contacts" 
            className="data-[state=active]:bg-white data-[state=active]:text-black text-white border-0"
          >
            <Users className="w-4 h-4 mr-2" />
            CONTACTS ({account.contacts_count})
          </TabsTrigger>
          <TabsTrigger 
            value="notes" 
            className="data-[state=active]:bg-white data-[state=active]:text-black text-white border-0"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            NOTES
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <AccountDetail account={account} />
        </TabsContent>

        <TabsContent value="opportunities" className="mt-6">
          <AccountOpportunityList accountId={account.id} />
        </TabsContent>

        <TabsContent value="contacts" className="mt-6">
          <AccountContactList accountId={account.id} />
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <AccountNoteList accountId={account.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}