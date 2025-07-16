// src/hooks/useNLPQuery.ts
import { useState } from 'react'

interface QueryResult {
  title: string
  meta: string
  items: string[]
  showAction?: boolean
}

export function useNLPQuery() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<QueryResult[] | null>(null)

  const executeQuery = async (query: string) => {
    setLoading(true)
    setResults(null)

    try {
      const response = await fetch('/api/nlp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })

      const data = await response.json()

      // Simulate processing time for effect
      await new Promise(resolve => setTimeout(resolve, 2300))

      setResults([
        {
          title: `ORCHESTRATING: "${query}"`,
          meta: 'EXECUTION TIME: 2.3s • CONFIDENCE: 98.7%',
          items: data.results,
          showAction: true
        }
      ])
    } catch (error) {
      setResults([{
        title: 'ORCHESTRATION FAILED',
        meta: 'AGENTS ENCOUNTERED RESISTANCE',
        items: ['Unable to process query. Agents regrouping...']
      }])
    } finally {
      setLoading(false)
    }
  }

  return { executeQuery, results, loading }
}