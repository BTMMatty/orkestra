'use client'

import { MessageSquare, Clock, User } from 'lucide-react'

interface Note {
  id: string
  content: string
  author: string
  created_at: string
  type: 'call' | 'email' | 'meeting' | 'general'
}

interface NoteListProps {
  accountId: string
}

export function NoteList({ accountId }: NoteListProps) {
  // Mock data - replace with real Supabase query
  const mockNotes: Note[] = [
    {
      id: '1',
      content: 'Follow-up call scheduled. Sarah mentioned they\'re evaluating 3 vendors and timeline is aggressive for Q3 implementation.',
      author: 'M.Adams',
      created_at: '2025-07-15T10:30:00Z',
      type: 'call'
    },
    {
      id: '2',
      content: 'Demo went extremely well. Technical team impressed with AI orchestration capabilities. Next step: executive presentation.',
      author: 'Agent.Sales',
      created_at: '2025-07-14T14:15:00Z',
      type: 'meeting'
    },
    {
      id: '3',
      content: 'Received RFP document. Requirements align well with our platform. Deadline for response: July 25th.',
      author: 'M.Adams',
      created_at: '2025-07-12T09:45:00Z',
      type: 'email'
    }
  ]

  const getTypeIcon = (type: Note['type']) => {
    switch (type) {
      case 'call': return '📞'
      case 'email': return '📧'
      case 'meeting': return '🤝'
      default: return '📝'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">ACTIVITY NOTES</h3>
        <button className="text-xs border border-white/30 px-3 py-1 hover:border-white transition-all">
          ADD NOTE
        </button>
      </div>

      {mockNotes.length === 0 ? (
        <div className="border border-white/20 p-8 text-center">
          <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <h4 className="font-bold mb-2">NO NOTES</h4>
          <p className="text-sm opacity-70">No activity notes for this account</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockNotes.map((note) => (
            <div key={note.id} className="border border-white/20 p-4 hover:border-white transition-all duration-200">
              <div className="flex items-start gap-3">
                <div className="text-lg mt-1">
                  {getTypeIcon(note.type)}
                </div>
                
                <div className="flex-1">
                  <p className="text-sm leading-relaxed mb-3">{note.content}</p>
                  
                  <div className="flex items-center gap-4 text-xs opacity-70">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{note.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(note.created_at)}</span>
                    </div>
                    
                    <span className="bg-white/10 px-2 py-1 rounded text-xs">
                      {note.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-white/20 pt-4">
        <div className="text-center text-xs opacity-70">
          {mockNotes.length} note{mockNotes.length !== 1 ? 's' : ''} • 
          Latest activity {mockNotes.length > 0 ? formatDate(mockNotes[0].created_at) : 'none'}
        </div>
      </div>
    </div>
  )
}