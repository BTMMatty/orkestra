'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, PlusCircle, Search, TrendingUp, AlertTriangle } from 'lucide-react'
import { useNLPQuery } from '@/hooks/useNLPQuery'

interface Suggestion {
  icon: React.ReactNode
  text: string
  action: string
}

interface QueryResult {
  title: string
  meta: string
  items: string[]
  showAction?: boolean
}

const suggestions: Suggestion[] = [
  {
    icon: <PlusCircle className="w-4 h-4" />,
    text: 'Create new account "TechCorp" with contact "John Doe"',
    action: 'create_account'
  },
  {
    icon: <Search className="w-4 h-4" />,
    text: 'Show all opportunities closing this month',
    action: 'search_opportunities'
  },
  {
    icon: <TrendingUp className="w-4 h-4" />,
    text: 'Forecast Q3 pipeline based on current velocity',
    action: 'forecast_pipeline'
  },
  {
    icon: <AlertTriangle className="w-4 h-4" />,
    text: 'Analyze lost deals by reason this quarter',
    action: 'analyze_losses'
  }
]

export function CommandBar() {
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { executeQuery, results, loading } = useNLPQuery()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async () => {
    if (!query.trim()) return
    
    setIsProcessing(true)
    setShowSuggestions(false)
    
    try {
      await executeQuery(query)
    } catch (error) {
      console.error('Query execution failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const quickActions = [
    { label: 'PIPELINE HEALTH', command: 'Show pipeline health' },
    { label: 'OVERDUE TASKS', command: 'List overdue tasks' },
    { label: "TODAY'S CHAOS", command: "Summarize today's activities" },
    { label: 'PREDICT WINS', command: 'Predict next wins' },
  ]

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Neural Background - Only render after mount to avoid hydration error */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-neural"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Command Section */}
      <div className="flex-1 flex items-center justify-center px-12">
        <div className="w-full max-w-3xl relative">
          <h1 className="text-5xl font-bold text-center mb-6 tracking-tight">
            ORCHESTRATE YOUR CHAOS
          </h1>
          
          <div className="relative group">
            <div className="border-2 border-white p-6 transition-all duration-200 
                          group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyPress={handleKeyPress}
                placeholder="Add note to Acme opportunity: Meeting went well, next step demo..."
                className="w-full bg-transparent outline-none text-lg placeholder:text-white/50 
                         placeholder:italic caret-white pr-12"
              />
              <button
                onClick={handleSubmit}
                disabled={isProcessing || loading}
                className="absolute right-6 top-1/2 -translate-y-1/2 transition-transform 
                         duration-200 hover:scale-125 disabled:opacity-50"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            {/* Suggestions */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black 
                            border border-white/20 z-10">
                {suggestions.map((suggestion, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setQuery(suggestion.text)
                      inputRef.current?.focus()
                    }}
                    className="flex items-center gap-4 px-6 py-4 cursor-pointer 
                             transition-all duration-100 hover:bg-white hover:text-black"
                  >
                    <span className="opacity-70 hover:opacity-100">
                      {suggestion.icon}
                    </span>
                    <span className="text-sm" dangerouslySetInnerHTML={{
                      __html: suggestion.text.replace(/^(\w+)/, '<strong>$1</strong>')
                    }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4 justify-center mt-8">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => {
                  setQuery(action.command)
                  inputRef.current?.focus()
                }}
                className="px-4 py-2 text-xs border border-white/30 
                         transition-all duration-200 hover:border-white 
                         hover:bg-white hover:text-black"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {(isProcessing || loading || results) && (
        <div className="px-12 pb-12 max-w-5xl mx-auto w-full">
          {(isProcessing || loading) ? (
            <div className="border border-white/20 p-6">
              <h3 className="text-xl font-bold mb-3">AGENTS DEPLOYED</h3>
              <div className="text-xs opacity-70 mb-4">
                Neural swarm analyzing your query...
              </div>
              <p>Multi-agent orchestration in progress. Stand by for symphony.</p>
            </div>
          ) : results && (
            <div className="space-y-6">
              {results.map((result: QueryResult, i: number) => (
                <div key={i} className="border border-white/20 p-6 
                                      hover:border-white transition-all duration-200
                                      hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  <h3 className="text-xl font-bold mb-3">{result.title}</h3>
                  <div className="text-xs opacity-70 mb-4">{result.meta}</div>
                  <div className="space-y-2">
                    {result.items.map((item, j) => (
                      <p key={j}>{item}</p>
                    ))}
                  </div>
                  {result.showAction && (
                    <button className="mt-4 bg-white text-black px-6 py-3 
                                     font-bold text-sm tracking-wider 
                                     transition-all duration-200 hover:scale-105
                                     hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]
                                     inline-flex items-center gap-2">
                      IGNITE FULL ANALYSIS
                      <span>🔥</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Agent Status */}
      <div className="fixed bottom-6 right-6 bg-black border border-white/20 
                    px-6 py-4 text-xs flex items-center gap-3">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span>5 AGENTS ONLINE | 0.3ms LATENCY | READY TO STRIKE</span>
      </div>
    </div>
  )
}