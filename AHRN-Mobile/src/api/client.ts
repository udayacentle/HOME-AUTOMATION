import { API_BASE_URL, DEMO_MODE } from '../config';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string;
};

/**
 * Thin REST wrapper — connect to apps/backend when HTTP routes are exposed.
 * Until then, screens use local demo data (see DEMO_MODE in config).
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (DEMO_MODE) {
    throw new Error('API not configured: set EXPO_PUBLIC_API_URL for live data');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API ${response.status}: ${path}`);
  }

  return response.json() as Promise<T>;
}
