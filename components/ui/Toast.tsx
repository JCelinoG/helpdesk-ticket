'use client';

import { Toast as ToastType } from '@/stores/useToastStore';
import { useEffect, useState } from 'react';
import styles from './Toast.module.scss';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onClose(toast.id), 300);
      }, toast.duration - 300); // Start exit animation before removal

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(toast.id), 300);
  };

  const typeClasses = {
    success: styles.success,
    error: styles.error,
    info: styles.info,
    warning: styles.warning,
  };

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  };

  return (
    <div
      className={`${styles.toast} ${typeClasses[toast.type]} ${isExiting ? styles.exit : ''}`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={styles.content}>
        <span className={styles.icon}>{icons[toast.type]}</span>
        <span className={styles.message}>{toast.message}</span>
      </div>
      <button
        onClick={handleClose}
        className={styles.closeButton}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}