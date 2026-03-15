import { describe, it, expect } from 'vitest';
import {
  parseMaxRetries,
  DEFAULT_MAX_RETRIES,
  LLM_CONFIG,
} from './llm-config.js';

describe('parseMaxRetries', () => {
  it('should return default when input is undefined', () => {
    expect(parseMaxRetries(undefined)).toBe(DEFAULT_MAX_RETRIES);
  });

  it('should parse a valid positive integer', () => {
    expect(parseMaxRetries('5')).toBe(5);
  });

  it('should allow zero (disabling retries)', () => {
    expect(parseMaxRetries('0')).toBe(0);
  });

  it('should return default for non-numeric string', () => {
    expect(parseMaxRetries('not-a-number')).toBe(DEFAULT_MAX_RETRIES);
  });

  it('should return default for negative value', () => {
    expect(parseMaxRetries('-2')).toBe(DEFAULT_MAX_RETRIES);
  });

  it('should return default for empty string', () => {
    expect(parseMaxRetries('')).toBe(DEFAULT_MAX_RETRIES);
  });
});

describe('LLM_CONFIG', () => {
  it('should have maxRetries as a number', () => {
    expect(typeof LLM_CONFIG.maxRetries).toBe('number');
    expect(LLM_CONFIG.maxRetries).toBeGreaterThanOrEqual(0);
  });
});

describe('DEFAULT_MAX_RETRIES', () => {
  it('should be 3', () => {
    expect(DEFAULT_MAX_RETRIES).toBe(3);
  });
});
