import { describe, it, expect, beforeAll } from 'vitest';

describe('ragQueryTool', () => {
  beforeAll(() => {
    process.env['OPENAI_API_KEY'] ??= 'test-key';
  });

  it('should have correct tool metadata', async () => {
    const { ragQueryTool } = await import('./rag-query.tool.js');
    expect(ragQueryTool.id).toBe('rag-query');
    expect(ragQueryTool.description).toContain('базе знаний');
  });
});
