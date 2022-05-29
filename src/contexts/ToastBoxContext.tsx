import React, { createContext, useCallback, useMemo } from 'react';
import { CloseAllToastsOptions, ToastId, useToast, UseToastOptions } from '@chakra-ui/react';

export interface Toast {
    (options?: UseToastOptions | undefined): ToastId | undefined;
    close: (id: ToastId) => void;
    closeAll: (options?: CloseAllToastsOptions | undefined) => void;
    update(id: ToastId, options: Omit<UseToastOptions, 'id'>): void;
    isActive: (id: ToastId) => boolean | undefined;
}

interface ToastContextType {
    toast: Toast | undefined;
    showToast: (showableToast: ToastId | undefined) => void;
    onCloseToast: () => void;
}

const initialToastBoxContext: ToastContextType = {
    toast: undefined,
    showToast: (showableToast: ToastId | undefined) => { console.warn(showableToast); },
    onCloseToast: () => { console.warn('close toast'); },
};

export const ToastBoxContext = createContext(initialToastBoxContext);

function ToastBoxContextProvider({ children }: { children: React.ReactChild }) {
    const toastIdRef = React.useRef<string | number | undefined>();
    const toast: Toast = useToast();

    const showToast = useCallback((showableToast: ToastId | undefined) => {
        if (toastIdRef.current) {
            toast.close(toastIdRef.current);
        }
        toastIdRef.current = showableToast;
    }, [toast]);

    const onCloseToast = useCallback(() => {
        if (toastIdRef.current) {
            toast.close(toastIdRef.current);
            toast.closeAll();
        }
    }, [toast]);

    const value = useMemo(
        () => ({
            toast,
            showToast,
            onCloseToast,
        }),
        [onCloseToast, showToast, toast],
    );
    return (
        <ToastBoxContext.Provider value={value}>
            {children}
        </ToastBoxContext.Provider>
    );
}

export default ToastBoxContextProvider;
