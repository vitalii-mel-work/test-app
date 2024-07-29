import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { NotificationType } from '../types/NotificationTypes';

type Notification = {
    type: NotificationType;
    message: string;
};

interface NotificationContextType {
    notification: Notification | null;
    setNotification: (notification: Notification | null) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notification, setNotification] = useState<Notification | null>(null);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 1500);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
            {notification && (
                <div
                    className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-transform transform ${notification.type === NotificationType.SUCCESS ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} translate-y-0`}
                >
                    {notification.message}
                </div>
            )}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
