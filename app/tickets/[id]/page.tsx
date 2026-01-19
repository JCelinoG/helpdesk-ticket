import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.scss';
import DeleteButton from '@/components/ui/DeleteButton';
import { statusColors, priorityColors } from '@/utils/colors';
import type { TicketStatus, TicketPriority } from '@/types/ticket';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TicketDetailPage(props: PageProps) {
  const params = await props.params;
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
  const response = await fetch(`${baseUrl}/api/tickets/${params.id}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    notFound();
  }
  
  const ticket = await response.json();

  // Type assertions
  const statusColor = statusColors[ticket.status as TicketStatus];
  const priorityColor = priorityColors[ticket.priority as TicketPriority];

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div>
          <h1>{ticket.title}</h1>
          <div className={styles.meta}>
            <span 
              className={styles.badge} 
              style={{ 
                backgroundColor: statusColor?.bg || '#E3F2FD',
                color: statusColor?.text || '#1565C0',
                borderColor: statusColor?.border || '#BBDEFB'
              }}
            >
              {ticket.status.replace('_', ' ')}
            </span>
            <span 
              className={styles.badge} 
              style={{ 
                backgroundColor: priorityColor?.bg || '#E8F5E9',
                color: priorityColor?.text || '#2E7D32',
                borderColor: priorityColor?.border || '#C8E6C9'
              }}
            >
              {ticket.priority}
            </span>
            <span className={styles.category}>{ticket.category}</span>
            <time className={styles.date}>
              Created: {new Date(ticket.createdAt).toLocaleDateString()}
            </time>
          </div>
        </div>
        
        <div className={styles.actions}>
          <Link href={`/tickets/${ticket.id}/edit`} className={styles.editButton}>
            Edit
          </Link>
          <DeleteButton ticketId={ticket.id} ticketTitle={ticket.title} />
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Description</h2>
          <p className={styles.description}>{ticket.description}</p>
        </section>

        <div className={styles.grid}>
          <section className={styles.section}>
            <h2>Contact Information</h2>
            <div className={styles.info}>
              <strong>Email:</strong>
              <a href={`mailto:${ticket.email}`}>{ticket.email}</a>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Ticket Details</h2>
            <div className={styles.info}>
              <strong>ID:</strong>
              <span>{ticket.id}</span>
            </div>
            <div className={styles.info}>
              <strong>Last Updated:</strong>
              <time>{new Date(ticket.updatedAt).toLocaleString()}</time>
            </div>
          </section>
        </div>

        {ticket.attachmentUrl && (
          <section className={styles.section}>
            <h2>Attachment</h2>
            <a
              href={ticket.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.attachment}
            >
              View Attachment →
            </a>
          </section>
        )}

        <div className={styles.backLink}>
          <Link href="/">← Back to all tickets</Link>
        </div>
      </div>
    </main>
  );
}