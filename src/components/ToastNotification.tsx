'use client';

import React from 'react';
import { XMarkIcon } from './icons';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface ToastNotificationProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toasts,
  onDismiss,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full"
    >
      {toasts.map((toast) => {
        const bgBorder =
          toast.type === 'success'
            ? 'bg-slate-900 text-white border-emerald-500/40 ring-1 ring-emerald-500/30'
            : toast.type === 'warning'
              ? 'bg-slate-900 text-white border-amber-500/40 ring-1 ring-amber-500/30'
              : 'bg-slate-900 text-white border-indigo-500/40 ring-1 ring-indigo-500/30';

        const dotColor =
          toast.type === 'success'
            ? 'bg-emerald-400'
            : toast.type === 'warning'
              ? 'bg-amber-400'
              : 'bg-indigo-400';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl p-4 shadow-xl border backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-200 ${bgBorder}`}
          >
            <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${dotColor} animate-pulse`} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold">{toast.title}</div>
              <div className="mt-0.5 text-xs text-slate-300 leading-snug">
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-md"
              aria-label="Dismiss notification"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
