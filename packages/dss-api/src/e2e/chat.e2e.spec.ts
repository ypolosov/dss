/**
 * E2E smoke tests — real LLM call.
 *
 * Default model: openai/gpt-4.1-mini (~$0.001 per full test suite run)
 * Override via DSS_MODEL env var, e.g.:
 *   DSS_MODEL="openrouter/meta-llama/llama-3.3-70b-instruct:free" npx vitest run --config vitest.e2e.config.ts
 *
 * Requires at least one API key: OPENAI_API_KEY, ANTHROPIC_API_KEY, or OPENROUTER_API_KEY
 */
import 'reflect-metadata';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, type INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module.js';

const E2E_MODEL = process.env['DSS_MODEL'] ?? 'openai/gpt-4.1-mini';
const HAS_API_KEY = !!process.env['OPENROUTER_API_KEY'] || !!process.env['OPENAI_API_KEY'] || !!process.env['ANTHROPIC_API_KEY'];

describe.skipIf(!HAS_API_KEY)('Chat E2E (real LLM)', () => {
  let app: INestApplication;
  let baseUrl: string;

  beforeAll(async () => {
    process.env['DSS_MODEL'] = E2E_MODEL;

    app = await NestFactory.create(AppModule, { logger: false });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    const server = app.getHttpServer();
    await new Promise<void>((resolve) => server.listen(0, () => resolve()));
    const addr = server.address();
    const port = typeof addr === 'object' && addr ? addr.port : 0;
    baseUrl = `http://127.0.0.1:${port}`;
  }, 30_000);

  afterAll(async () => {
    await app?.close();
  });

  describe('validation', () => {
    it('should reject empty body with 400', async () => {
      const res = await fetch(`${baseUrl}/chat/sa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      expect(res.status).toBe(400);
    });

    it('should reject empty message with 400', async () => {
      const res = await fetch(`${baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: '' }),
      });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /chat/sa (direct SA agent)', () => {
    it('should answer architecture question using ragQueryTool', async () => {
      const res = await fetch(`${baseUrl}/chat/sa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Какие контейнеры выделены в архитектуре DSS? Перечисли их.',
        }),
      });

      expect(res.status).toBe(201);
      const body = await res.json();

      expect(body.agentId).toBe('sa-agent');
      expect(body.threadId).toBeTruthy();
      expect(body.text).toBeTruthy();
      expect(body.text.length).toBeGreaterThan(50);

      // Should mention at least some containers from mock KB
      const text = body.text.toLowerCase();
      const mentionsContainers =
        text.includes('api gateway') ||
        text.includes('agent orchestrator') ||
        text.includes('rag engine') ||
        text.includes('контейнер');
      expect(mentionsContainers).toBe(true);
    }, 60_000);

    it('should answer RAG pipeline question', async () => {
      const res = await fetch(`${baseUrl}/chat/sa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Как работает RAG pipeline в DSS?',
        }),
      });

      expect(res.status).toBe(201);
      const body = await res.json();

      expect(body.text).toBeTruthy();
      expect(body.text.length).toBeGreaterThan(30);
    }, 60_000);
  });

  describe('POST /chat (network routing)', () => {
    it('should route architecture question and produce response', async () => {
      const res = await fetch(`${baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Расскажи про оркестрацию агентов в DSS',
        }),
      });

      expect(res.status).toBe(201);
      const body = await res.json();

      expect(body.threadId).toBeTruthy();
      expect(body.text).toBeTruthy();
      expect(body.text.length).toBeGreaterThan(20);
    }, 90_000);

    it('should handle out-of-scope question gracefully', async () => {
      const res = await fetch(`${baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Какая погода завтра в Москве?',
        }),
      });

      expect(res.status).toBe(201);
      const body = await res.json();

      expect(body.text).toBeTruthy();
      // Should politely decline or explain scope limitation
      expect(body.text.length).toBeGreaterThan(10);
    }, 90_000);
  });
});
