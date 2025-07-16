import { NextResponse } from 'next/server'
import { processNLPQuery } from '@/lib/ai/nlp-service'  // Fixed: Correct export - iteration over bloat

export async function POST(request: Request) {
  // No auth - open-source freedom (add your own if needed in forks)
  const { query } = await request.json()
  
  try {
    const result = await processNLPQuery(query, 'mock_user_id')  // Mock ID for open-source - real in prod forks
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'NLP processing failed' }, { status: 500 })
  }
}