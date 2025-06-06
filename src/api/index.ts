const BASE_URL = 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com';

type FetchOptions = {
    method?: string;
    body?: BodyInit | null;
    headers?: HeadersInit;
};

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: options.method || 'GET',
        headers: options.headers,
        body: options.body
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Ошибка ${res.status}: ${errorText}`);
    }

    return res.json();
}
