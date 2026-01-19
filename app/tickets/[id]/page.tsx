import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.scss';
import DeleteButton from '@/components/ui/DeleteButton';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TicketDetailPage(props: PageProps) {
  const params = await props.params;
  
  const response = await fetch(`${baseUrl}/api/tickets/${params.id}`, {
  cache: 'no-store',
});
  
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }

    // erro genérico
    return (
      <main className={styles.main}>
        <div className={styles.error}>
          <h2>Error Loading Ticket</h2>
          <p>Failed to load ticket details.</p>
          <Link href="/">← Back to Tickets</Link>
        </div>
      </main>
    );
  }
  
  const ticket = await response.json();

  const statusColors = {
    open: '#ef4444',
    in_progress: '#f59e0b',
    resolved: '#10b981',
  };

  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div>
          <h1>{ticket.title}</h1>
          <div className={styles.meta}>
            <span className={styles.badge} style={{ backgroundColor: statusColors[ticket.status] }}>
              {ticket.status.replace('_', ' ')}
            </span>
            <span className={styles.badge} style={{ backgroundColor: priorityColors[ticket.priority] }}>
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