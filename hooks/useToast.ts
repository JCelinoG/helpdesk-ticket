import useToastStore from '@/stores/useToastStore';

export function useToast() {
  const { addToast, removeToast, clearToasts } = useToastStore();

  const success = (message: string, duration?: number) => {
    return addToast(message, 'success', duration);
  };

  const error = (message: string, duration?: number) => {
    return addToast(message, 'error', duration);
  };

  const info = (message: string, duration?: number) => {
    return addToast(message, 'info', duration);
  };

  const warning = (message: string, duration?: number) => {
    return addToast(message, 'warning', duration);
  };

  return {
    success,
    error,
    info,
    warning,
    remove: removeToast,
    clear: clearToasts,
  };
}