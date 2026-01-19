'use client';

import TicketForm from '@/components/tickets/TicketForm';
import { TicketFormData } from '@/lib/validations/ticket';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.scss';

export default function NewTicketPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }

      // Redirect to home page on success
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Create New Ticket</h1>
        <p>Fill out the form below to create a new support ticket</p>
      </header>

      <div className={styles.content}>
        <TicketForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitText="Create Ticket"
        />
      </div>
    </main>
  );
}