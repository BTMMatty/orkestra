// src/lib/ai/agent-configs.ts

export interface AgentConfig {
  id: string
  name: string
  type: 'analyzer' | 'predictor' | 'executor' | 'monitor'
  description: string
  capabilities: string[]
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
}

export const AGENT_CONFIGS: Record<string, AgentConfig> = {
  'agent-analyze': {
    id: 'agent-analyze',
    name: 'Agent.Analyze',
    type: 'analyzer',
    description: 'Pattern recognition and data analysis specialist',
    capabilities: ['data_analysis', 'pattern_recognition', 'report_generation'],
    model: 'claude-3-sonnet',
    temperature: 0.3,
    maxTokens: 2000,
    systemPrompt: `You are Agent.Analyze, a specialized AI for CRM data analysis. 
    Focus on identifying patterns, trends, and actionable insights from sales data.
    Always provide specific, quantified recommendations with supporting evidence.`
  },
  
  'agent-predict': {
    id: 'agent-predict',
    name: 'Agent.Predict',
    type: 'predictor',
    description: 'Forecasting and predictive analytics specialist',
    capabilities: ['forecasting', 'probability_analysis', 'trend_prediction'],
    model: 'claude-3-sonnet',
    temperature: 0.2,
    maxTokens: 1500,
    systemPrompt: `You are Agent.Predict, specialized in sales forecasting and predictive analytics.
    Use statistical reasoning and historical patterns to generate accurate predictions.
    Always include confidence intervals and key assumptions in your forecasts.`
  },
  
  'agent-execute': {
    id: 'agent-execute',
    name: 'Agent.Execute',
    type: 'executor',
    description: 'Task automation and workflow execution specialist',
    capabilities: ['task_automation', 'workflow_execution', 'crm_operations'],
    model: 'claude-3-sonnet',
    temperature: 0.1,
    maxTokens: 1000,
    systemPrompt: `You are Agent.Execute, responsible for automating CRM tasks and workflows.
    Focus on precise, efficient execution of user requests.
    Always confirm actions before execution and provide clear status updates.`
  },
  
  'agent-monitor': {
    id: 'agent-monitor',
    name: 'Agent.Monitor',
    type: 'monitor',
    description: 'Real-time monitoring and alert specialist',
    capabilities: ['monitoring', 'alert_generation', 'anomaly_detection'],
    model: 'claude-3-sonnet',
    temperature: 0.4,
    maxTokens: 800,
    systemPrompt: `You are Agent.Monitor, specialized in real-time CRM monitoring.
    Watch for anomalies, trigger alerts, and provide proactive insights.
    Focus on actionable alerts that help prevent issues before they occur.`
  },
  
  'agent-neural': {
    id: 'agent-neural',
    name: 'Agent.Neural',
    type: 'analyzer',
    description: 'Advanced neural network processing specialist',
    capabilities: ['deep_analysis', 'complex_pattern_recognition', 'multi_modal_processing'],
    model: 'claude-3-opus',
    temperature: 0.5,
    maxTokens: 3000,
    systemPrompt: `You are Agent.Neural, the most advanced analytical agent in the Orkestra system.
    Handle complex, multi-faceted analysis requiring deep reasoning.
    Provide comprehensive insights that combine multiple data sources and perspectives.`
  }
}

export const getAgentConfig = (agentId: string): AgentConfig | undefined => {
  return AGENT_CONFIGS[agentId]
}

export const getAllAgentConfigs = (): AgentConfig[] => {
  return Object.values(AGENT_CONFIGS)
}

export const getAgentsByType = (type: AgentConfig['type']): AgentConfig[] => {
  return Object.values(AGENT_CONFIGS).filter(config => config.type === type)
}