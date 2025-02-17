export const fetcher = async <T>(
    base_url: string,
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
    body?: object,
    token?: string,
): Promise<T> => {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        }
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${base_url}${endpoint}`, options);

        if (!response.ok) {
            let errorData
            try {
                errorData = await response.json();
            } catch {
                errorData = { message: await response.text() };
            }
            throw new Error(errorData.message || 'Error en la solicitud');
        }
        
        let result;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            result = await response.json();
        } else {
            result = await response.text();
        }

        return result as T;
    } catch (error) {
        console.error('Error en fetcher:', error);
        throw error;
    }
};