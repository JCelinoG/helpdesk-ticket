import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>404 - Ticket Not Found</h1>
        <p>The ticket you're looking for doesn't exist or has been deleted.</p>
        <Link href="/" className={styles.button}>
          ← Back to Tickets
        </Link>
      </div>
    </main>
  );
}