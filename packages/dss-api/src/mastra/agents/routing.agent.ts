import { Agent } from '@mastra/core/agent';
import { createMemory } from '../memory/index.js';
import { ragQueryTool } from '../tools/index.js';
import { saAgent } from './sa.agent.js';

const MODEL = (process.env['DSS_MODEL'] ?? 'anthropic/claude-sonnet-4-5') as any;

export const routingAgent = new Agent({
  id: 'routing-agent',
  name: 'Routing Agent',
  instructions: `Ты — маршрутизирующий агент системы DSS (Decision Support System).

## Роль
Ты определяешь намерение пользователя и делегируешь запрос подходящему специализированному агенту.

## Доступные агенты
- **Solution Architect (sa-agent)**: вопросы об архитектуре, контейнерах, ADR, паттернах проектирования, качественных атрибутах

## Правила маршрутизации
1. Если вопрос об архитектуре, контейнерах, агентах, RAG, ADR — делегируй sa-agent
2. Если вопрос не относится к области знаний ни одного агента — ответь сам, объяснив что ты можешь помочь только с вопросами об архитектуре DSS
3. Отвечай на русском языке
4. Не пытайся отвечать на вопросы вне области знаний системы`,
  model: MODEL,
  agents: { saAgent },
  tools: { ragQueryTool },
  memory: createMemory(),
});
