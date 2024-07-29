import React, { useState } from 'react';
import { shortenUrl } from '../services/bitlyService';
import { useNotification } from '../contexts/NotificationContext';
import { NotificationType } from '../types/NotificationTypes';

const UrlShortener: React.FC = () => {
    const [longUrl, setLongUrl] = useState<string>('');
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { setNotification } = useNotification();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setNotification(null);

        try {
            const result = await shortenUrl(longUrl);
            setShortUrl(result);
            setNotification({ type: NotificationType.SUCCESS, message: 'URL successfully shortened!' });
        } catch {
            setNotification({ type: NotificationType.ERROR, message: 'Failed to shorten URL. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl)
                .then(() => setNotification({ type: NotificationType.SUCCESS, message: 'URL copied to clipboard!' }))
                .catch(() => setNotification({ type: NotificationType.ERROR, message: 'Failed to copy URL.' }));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg relative">
                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">URL Shortener</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <input
                            type="text"
                            value={longUrl}
                            onChange={(e) => setLongUrl(e.target.value)}
                            placeholder="Enter your long URL here..."
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                            disabled={loading}
                        >
                            {loading ? 'Shortening...' : 'Shorten URL'}
                        </button>
                    </div>
                    {shortUrl && (
                        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner flex items-center justify-between">
                            <p className="font-semibold text-gray-800">Shortened URL:</p>
                            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{shortUrl}</a>
                            <button
                                onClick={handleCopy}
                                type="button"
                                className="ml-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                aria-label="Copy URL to clipboard"
                            >
                                Copy URL
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default UrlShortener;
