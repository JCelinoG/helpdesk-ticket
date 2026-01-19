import { Ticket } from '@/types/ticket';
import Link from 'next/link';
import styles from './TicketItem.module.scss';
import { statusColors, priorityColors } from '@/utils/colors';

interface TicketItemProps {
  ticket: Ticket;
}

export default function TicketItem({ ticket }: TicketItemProps) {
  const statusLabels = {
    open: 'Open',
    in_progress: 'In Progress',
    resolved: 'Resolved',
  };

  const priorityLabels = {
    low: 'Low Priority',
    medium: 'Medium Priority',
    high: 'High Priority',
  };

  return (
    <article className={styles.card}>
      <Link 
        href={`/tickets/${ticket.id}`} 
        className={styles.cardLink}
        aria-label={`View ticket: ${ticket.title}. Status: ${statusLabels[ticket.status]}. Priority: ${priorityLabels[ticket.priority]}.`}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{ticket.title}</h3>
          <div className={styles.meta}>
            <span
              className={styles.badge}
              style={{
                backgroundColor: statusColors[ticket.status].bg,
                color: statusColors[ticket.status].text,
                borderColor: statusColors[ticket.status].border,
              }}
            >
              {ticket.status.replace('_', ' ')}
            </span>
            <span
              className={styles.badge}
              style={{
                backgroundColor: priorityColors[ticket.priority].bg,
                color: priorityColors[ticket.priority].text,
                borderColor: priorityColors[ticket.priority].border,
              }}
            >
              {ticket.priority}
            </span>
            <span className={styles.category}>
              {ticket.category}
            </span>
          </div>
        </div>
        <p className={styles.description}>{ticket.description.substring(0, 100)}...</p>
        <div className={styles.footer}>
          <address className={styles.email}>
            {ticket.email}
          </address>
          <time 
            className={styles.date}
            dateTime={ticket.createdAt}
          >
            {new Date(ticket.createdAt).toLocaleDateString()}
          </time>
        </div>
      </Link>
    </article>
  );
}