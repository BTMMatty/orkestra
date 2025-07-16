// src/lib/ai/nlp-service.ts
import { anthropic } from '@/lib/anthropic'  // Stubbed for open-source - no keys, pure iteration

export async function processNLPQuery(query: string, userId: string) {
  try {
    // First, classify intent
    const classification = await classifyIntent(query)
    
    switch (classification.intent) {
      case 'create_opportunity':
        return await handleCreateOpportunity(query, userId)
      
      case 'search_opportunities':
        return await handleSearchOpportunities(query, userId)
      
      case 'analyze_pipeline':
        return await handleAnalyzePipeline(query, userId)
      
      case 'predict_win':
        return await handlePredictWin(query, userId)
      
      default:
        return { error: 'Unrecognized intent', suggestions: ['Try "Add opportunity..." or "Show deals..."'] }
    }
  } catch (error: any) {
    console.error('NLP processing failed:', error)
    return { error: 'Orchestration failed. Agents rerouting...' }
  }
}

async function classifyIntent(query: string) {
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20240620',  // Stub ignores model - open-source flex
    max_tokens: 100,
    messages: [{
      role: 'user',
      content: `Classify this CRM query intent: "${query}"
      
      Possible intents:
      - create_opportunity
      - search_opportunities
      - analyze_pipeline
      - predict_win
      
      Output JSON: {intent: "one_of_above", confidence: 0-1}`
    }]
  })

  return JSON.parse(response.content[0].text)
}

async function handleCreateOpportunity(query: string, userId: string) {
  const params = await extractParams(query, 'create_opportunity')
  
  // Validate and create in Supabase (mock insert for build - real in prod)
  const { data } = await supabase.from('opportunities').insert({
    user_id: userId,
    name: params.name || 'New Opportunity',
    account_id: params.account_id,
    stage: params.stage || 'prospecting',
    value: params.value || 0,
    probability: params.probability || 50,
    close_date: params.close_date || new Date().toISOString()
  }).select().single()

  return { success: true, opportunity: data }
}

async function extractParams(query: string, intent: string) {
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: `Extract params from query for ${intent}: "${query}"
      
      For create_opportunity: {name: str, account_id: str, stage: str, value: num, probability: num 0-100, close_date: ISO}
      
      Output clean JSON only.`
    }]
  })

  const params = JSON.parse(response.content[0].text)
  
  // Clean extracted params
  if (params.value && typeof params.value === 'string') {
    params.value = parseFloat(params.value.replace(/[^0-9.]/g, ''))
  }
  
  // Extract monetary values - full fixed, no eof
  const moneyMatch = query.match(/\$[\d,]+/g)
  if (moneyMatch) {
    params.value = parseInt(moneyMatch[0].replace(/[\$,]/g, ''), 10) || 0  // Clean to int, base 10, fallback 0
  }

  return params
}

// Add similar handlers for other intents... (expand in forks - keep lean)