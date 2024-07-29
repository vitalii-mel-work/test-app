const BASE_URL = 'https://api-ssl.bitly.com/v4/shorten';
const ACCESS_TOKEN = import.meta.env.VITE_BITLY_ACCESS_TOKEN as string;

interface ShortenResponse {
    link: string;
}

export async function shortenUrl(longUrl: string): Promise<string> {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ long_url: longUrl }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data: ShortenResponse = await response.json();
        return data.link;
    } catch (error) {
        console.error('Failed to shorten URL:', error);
        throw error;
    }
}
