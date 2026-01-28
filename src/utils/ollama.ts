export type OllamaTagResponse = {
  models?: Array<{
    name: string;
  }>;
};

const OLLAMA_BASE_URL = 'http://localhost:11434';

const withTimeout = async <T>(
  fn: (signal: AbortSignal) => Promise<T>,
  timeoutMs: number
): Promise<T> => {
  const controller = new AbortController();
  const id = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fn(controller.signal);
  } finally {
    window.clearTimeout(id);
  }
};

export const isOllamaAvailable = async (): Promise<boolean> => {
  try {
    const res = await withTimeout(
      (signal) =>
        fetch(`${OLLAMA_BASE_URL}/api/tags`, {
          method: 'GET',
          signal,
        }),
      1000
    );
    return res.ok;
  } catch {
    return false;
  }
};

export const listOllamaModels = async (): Promise<string[]> => {
  const res = await withTimeout(
    (signal) =>
      fetch(`${OLLAMA_BASE_URL}/api/tags`, {
        method: 'GET',
        signal,
      }),
    2000
  );

  if (!res.ok) return [];

  const data = (await res.json()) as OllamaTagResponse;
  const models = (data.models ?? []).map((m) => m.name).filter(Boolean);
  return Array.from(new Set(models));
};

export const generateWithOllama = async (args: {
  model: string;
  prompt: string;
}): Promise<string> => {
  try {
    const res = await withTimeout(
      (signal) =>
        fetch(`${OLLAMA_BASE_URL}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal,
          body: JSON.stringify({
            model: args.model,
            prompt: args.prompt,
            stream: false,
          }),
        }),
      180000
    );

    if (!res.ok) {
      let body = '';
      try {
        body = await res.text();
      } catch {
        body = '';
      }
      throw new Error(`Ollama request failed (${res.status} ${res.statusText})${body ? `: ${body}` : ''}`);
    }

    const data = (await res.json()) as { response?: string };
    return (data.response ?? '').trim();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (/aborted/i.test(msg)) {
      throw new Error('Timed out while waiting for Ollama to respond. Try a smaller resume text or a smaller model.');
    }
    throw new Error(msg || 'Failed to call Ollama');
  }
};
