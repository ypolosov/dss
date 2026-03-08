import { describe, it, expect } from 'vitest';
import { ragQueryTool } from './rag-query.tool.js';

describe('ragQueryTool', () => {
  const execute = ragQueryTool.execute! as (input: { query: string }) => Promise<{ results: string; source: string }>;

  it('should return container info for container-related query', async () => {
    const result = await execute({ query: 'Какие контейнеры в системе?' });

    expect(result.results).toContain('API Gateway');
    expect(result.results).toContain('Agent Orchestrator');
    expect(result.results).toContain('RAG Engine');
    expect(result.results).toContain('ADR-0001');
    expect(result.source).toContain('Mock KB');
  });

  it('should return agent info for agent-related query', async () => {
    const result = await execute({ query: 'Как работает маршрутизация агентов?' });

    expect(result.results).toContain('Routing Agent');
    expect(result.results).toContain('Agent Registry');
    expect(result.results).toContain('ADR-0002');
  });

  it('should return RAG info for RAG-related query', async () => {
    const result = await execute({ query: 'Что такое RAG pipeline и embedding?' });

    expect(result.results).toContain('Document Processor');
    expect(result.results).toContain('Vector Store');
    expect(result.results).toContain('ADR-0003');
  });

  it('should return architecture info for architecture-related query', async () => {
    const result = await execute({ query: 'Расскажи про гексагональную архитектуру' });

    expect(result.results).toContain('ChannelPort');
    expect(result.results).toContain('KnowledgeSourcePort');
  });

  it('should match multiple categories when query spans topics', async () => {
    const result = await execute({ query: 'контейнеры и агенты в архитектуре' });

    expect(result.results).toContain('API Gateway');
    expect(result.results).toContain('Routing Agent');
    expect(result.results).toContain('ChannelPort');
  });

  it('should return not-found message for irrelevant query', async () => {
    const result = await execute({ query: 'Какая погода в Москве?' });

    expect(result.results).toContain('Релевантная информация не найдена');
  });

  it('should be case-insensitive', async () => {
    const result = await execute({ query: 'КОНТЕЙНЕР' });

    expect(result.results).toContain('API Gateway');
  });

  it('should have correct tool metadata', () => {
    expect(ragQueryTool.id).toBe('rag-query');
    expect(ragQueryTool.description).toContain('базе знаний');
  });
});
