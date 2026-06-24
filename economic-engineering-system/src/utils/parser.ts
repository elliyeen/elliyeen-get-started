/**
 * Robustly parse JSON from a Claude response that may contain markdown code blocks.
 * Handles:
 *   - Raw JSON
 *   - ```json ... ``` blocks
 *   - ``` ... ``` blocks (no language tag)
 *   - JSON embedded in explanatory prose
 */
export function parseJsonFromResponse<T>(text: string): Partial<T> {
  // 1. Try to extract from a markdown code block first
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim()) as T;
    } catch {
      // fall through
    }
  }

  // 2. Try the whole text as JSON
  try {
    return JSON.parse(text.trim()) as T;
  } catch {
    // fall through
  }

  // 3. Try to find the first { ... } block in the text
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const candidate = text.slice(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate) as T;
    } catch {
      // fall through
    }
  }

  // 4. Nothing worked — return empty object and let callers use defaults
  console.error("[parser] Failed to parse JSON from response:", text.slice(0, 200));
  return {} as Partial<T>;
}
