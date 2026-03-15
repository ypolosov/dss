/**
 * LLM configuration shared across all agents.
 *
 * QA-006: Fault tolerance — configurable retry for transient LLM failures.
 * Mastra Agent delegates to AI SDK which handles exponential backoff
 * on transient errors (429 Too Many Requests, 500, 503 Service Unavailable).
 */

export const DEFAULT_MAX_RETRIES = 3;

/**
 * Parses a raw string value into a valid maxRetries number.
 * Returns DEFAULT_MAX_RETRIES for NaN or negative values.
 */
export function parseMaxRetries(raw: string | undefined): number {
  const parsed = parseInt(raw ?? String(DEFAULT_MAX_RETRIES), 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return DEFAULT_MAX_RETRIES;
  }
  return parsed;
}

export const LLM_CONFIG = {
  /**
   * Maximum number of retries for LLM API calls on transient failures.
   * Set to 0 to disable retries.
   *
   * AI SDK applies exponential backoff: ~1s, ~2s, ~4s between retries.
   *
   * @default 3
   * @env DSS_LLM_MAX_RETRIES
   */
  maxRetries: parseMaxRetries(process.env['DSS_LLM_MAX_RETRIES']),
} as const;
