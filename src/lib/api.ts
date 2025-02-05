import { useAuthStore } from '@/stores/use-auth-store';
import bs58 from 'bs58';

interface LoginResponse
{
  Authorization: string;
  is_premium: boolean;
}

interface LoginRequest
{
  public_key: string;
  signature: string;
  timestamp: number;
}

const API_URL = 'https://api.zuke.gg';
// const API_URL = 'http://127.0.0.1';

// Helper function to make authenticated requests
export async function fetchWithAuth(url: string, options: RequestInit = {})
{
  const { token } = useAuthStore.getState();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': token } : {}),
    ...options.headers,
  };

  return fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });
}

export async function loginWithWallet(publicKey: string, signature: string, timestamp: number): Promise<LoginResponse>
{
  console.log("📡 Making login request with:", {
    publicKey,
    signature,
    timestamp
  });

  const requestBody: LoginRequest = {
    public_key: publicKey,
    signature,
    timestamp,
  };

  console.log("📦 Request body:", requestBody);

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("🔥 Login request failed:", {
      status: response.status,
      statusText: response.statusText,
      error: errorText
    });
    throw new Error(`Login failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  console.log("📦 Login response:", data);
  return data;
} 