import TicketList from '@/components/tickets/TicketList';
import FilterBar from '@/components/tickets/FilterBar';
import { mockApi } from '@/lib/mock-data';
import styles from './page.module.scss';

export default async function Home() {
  // SSR: Fetch tickets on server
  const tickets = await mockApi.getTickets();

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
        <FilterBar />
        <TicketList initialTickets={tickets} />
      </section>
    </main>
  );
}