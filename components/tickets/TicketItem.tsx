import { Ticket } from '@/types/ticket';
import Link from 'next/link';
import styles from './TicketItem.module.scss';

interface TicketItemProps {
  ticket: Ticket;
}

export default function TicketItem({ ticket }: TicketItemProps) {
  const statusColors = {
    open: 'var(--danger-color)',
    in_progress: 'var(--warning-color)',
    resolved: 'var(--success-color)',
  };

  const priorityColors = {
    low: 'var(--success-color)',
    medium: 'var(--warning-color)',
    high: 'var(--danger-color)',
  };

  return (
    <Link href={`/tickets/${ticket.id}`} className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{ticket.title}</h3>
        <div className={styles.meta}>
          <span
            className={styles.status}
            style={{ backgroundColor: statusColors[ticket.status] }}
          >
            {ticket.status.replace('_', ' ')}
          </span>
          <span
            className={styles.priority}
            style={{ backgroundColor: priorityColors[ticket.priority] }}
          >
            {ticket.priority}
          </span>
          <span className={styles.category}>{ticket.category}</span>
        </div>
      </div>
      <p className={styles.description}>{ticket.description.substring(0, 100)}...</p>
      <div className={styles.footer}>
        <span className={styles.email}>{ticket.email}</span>
        <time className={styles.date}>
          {new Date(ticket.createdAt).toLocaleDateString()}
        </time>
      </div>
    </Link>
  );
}