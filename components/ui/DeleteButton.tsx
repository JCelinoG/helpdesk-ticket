'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import useTicketStore from '@/stores/useTicketStore';
import styles from './DeleteButton.module.scss';

interface DeleteButtonProps {
  ticketId: string;
  ticketTitle: string;
}

export default function DeleteButton({ ticketId, ticketTitle }: DeleteButtonProps) {
  const router = useRouter();
  const toast = useToast();
  const { removeTicketFromStore } = useTicketStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showConfirm && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showConfirm]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete ticket');
      }

      removeTicketFromStore(ticketId);
      
      toast.success('Ticket deleted successfully!');
      
      router.refresh();
      
      setTimeout(() => {
        router.push('/');
      }, 300);
      
    } catch (error) {
      console.error('Error deleting ticket:', error);
      toast.error('Failed to delete ticket');
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowConfirm(false);
    }
    if (e.key === 'Tab' && showConfirm) {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className={styles.deleteButton}
        disabled={isDeleting}
        aria-label={`Delete ticket: ${ticketTitle}`}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>

      {showConfirm && (
        <div 
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onKeyDown={handleKeyDown}
        >
          <div 
            ref={modalRef}
            className={styles.modal}
            tabIndex={-1}
          >
            <h3 id="modal-title">Confirm Delete</h3>
            <p>
              Are you sure you want to delete ticket &quot;{ticketTitle}&quot;?
              This action cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <button
                ref={cancelButtonRef}
                onClick={() => setShowConfirm(false)}
                className={styles.cancelButton}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                ref={confirmButtonRef}
                onClick={handleDelete}
                className={styles.confirmButton}
                disabled={isDeleting}
                aria-busy={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}