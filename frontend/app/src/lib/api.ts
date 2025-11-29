const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export async function apiGet<T = any>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  return handleResponse(res);
}

export async function apiPost<T = any>(path: string, body: any): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function apiPut<T = any>(path: string, body: any): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'PUT',
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function apiDelete<T = any>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { method: 'DELETE' });
  return handleResponse(res);
}
