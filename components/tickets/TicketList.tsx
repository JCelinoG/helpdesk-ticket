'use client';

import { useEffect, useState } from 'react';
import TicketItem from './TicketItem';
import useTicketStore from '@/stores/useTicketStore';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import styles from './TicketList.module.scss';

interface TicketListProps {
  initialTickets?: any[];
}

export default function TicketList({ initialTickets }: TicketListProps) {
  const [isLoading, setIsLoading] = useState(!initialTickets);
  const [error, setError] = useState<string>('');
  const { tickets, filteredTickets, setTickets } = useTicketStore();

  useEffect(() => {
    if (!initialTickets) {
      fetchTickets();
    } else {
      setTickets(initialTickets);
    }
  }, []);

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/tickets');
      if (!response.ok) throw new Error('Failed to fetch tickets');
      const data = await response.json();
      setTickets(data);
    } catch (err) {
      setError('Failed to load tickets. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
        <p>Loading tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h3>Error Loading Tickets</h3>
        <p>{error}</p>
        <button onClick={fetchTickets} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  if (filteredTickets.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No tickets found</h3>
        <p>Try adjusting your filters or create a new ticket.</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <div className={styles.summary}>
        Showing {filteredTickets.length} of {tickets.length} tickets
      </div>
      {filteredTickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}