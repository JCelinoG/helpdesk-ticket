'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TicketForm from '@/components/tickets/TicketForm';
import { TicketFormData } from '@/lib/validations/ticket';
import { Ticket } from '@/types/ticket';
import styles from './page.module.scss';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditTicketPage({ params }: PageProps) {
  const router = useRouter();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    try {
      const response = await fetch(`/api/tickets/${params.id}`);
      if (!response.ok) {
        if (response.status === 404) {
          router.push('/');
          return;
        }
        throw new Error('Failed to fetch ticket');
      }
      const data = await response.json();
      setTicket(data);
    } catch (error) {
      setError('Failed to load ticket');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/tickets/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          status: ticket?.status || 'open',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket');
      }

      router.push(`/tickets/${params.id}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.loading}>Loading...</div>
      </main>
    );
  }

  if (error || !ticket) {
    return (
      <main className={styles.main}>
        <div className={styles.error}>
          <h2>Ticket Not Found</h2>
          <p>The ticket you're trying to edit doesn't exist.</p>
          <button onClick={() => router.push('/')} className={styles.backButton}>
            Back to Tickets
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Edit Ticket</h1>
        <p>Update the ticket information below</p>
      </header>

      <div className={styles.content}>
        <TicketForm
          initialData={ticket}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitText="Save Changes"
        />
      </div>
    </main>
  );
}