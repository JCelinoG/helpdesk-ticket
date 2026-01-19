import TicketList from '@/components/tickets/TicketList';
import FilterBar from '@/components/tickets/FilterBar';
import styles from './page.module.scss';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const response = await fetch(`${baseUrl}/api/tickets`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    return (
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Helpdesk Tickets</h1>
          <p>Manage your support tickets efficiently</p>
        </header>
        <div className={styles.content}>
          <p>Error loading tickets. Please try again.</p>
        </div>
      </main>
    );
  }
  
  const tickets = await response.json();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Helpdesk Tickets</h1>
        <p>Manage your support tickets efficiently</p>
      </header>

      <div className={styles.actions}>
        <a href="/new" className={styles.createButton}>
          + Create New Ticket
        </a>
      </div>

      <section className={styles.content}>
        <div id="filters">
          <FilterBar />
        </div>
        <TicketList initialTickets={tickets} />
      </section>
      <p>By: <a href="https://joaocelino.dev/" target="_blank" rel="noopener noreferrer">João Celino Gualberto</a></p>

    </main>
  );
}