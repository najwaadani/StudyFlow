import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div 
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />,
    info: <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />,
    error: <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />,
  };

  const borders = {
    success: 'border-emerald-200 bg-white shadow-lg shadow-emerald-950/5',
    info: 'border-blue-200 bg-white shadow-lg shadow-blue-950/5',
    warning: 'border-amber-200 bg-white shadow-lg shadow-amber-950/5',
    error: 'border-red-200 bg-white shadow-lg shadow-red-950/5',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 26, stiffness: 350 }}
      className={`pointer-events-auto relative overflow-hidden rounded-xl border p-3.5 pr-8 ${borders[toast.type]}`}
    >
      <div className="flex items-start gap-2.5">
        {icons[toast.type]}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-800 leading-tight">
            {toast.title}
          </p>
          {toast.message && (
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              {toast.message}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="absolute top-2.5 right-2.5 p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Progress line */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 3.8, ease: 'linear' }}
        style={{ originX: 0 }}
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${
          toast.type === 'success'
            ? 'bg-emerald-500'
            : toast.type === 'error'
            ? 'bg-red-500'
            : toast.type === 'warning'
            ? 'bg-amber-500'
            : 'bg-blue-500'
        }`}
      />
    </motion.div>
  );
};
