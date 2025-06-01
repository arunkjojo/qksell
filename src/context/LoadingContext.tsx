import React, { useState } from 'react';
import { LoadingContext } from '@context/LoadingProvider';

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-800 font-medium">Loading...</span>
                    </div>
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    );
}

export { LoadingContext };
