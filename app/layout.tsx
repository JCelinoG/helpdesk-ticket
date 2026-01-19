import type { Metadata } from 'next';
import Link from 'next/link';
import SkipLink from '@/components/ui/SkipLink';
import ToastContainer from '@/components/ui/ToastContainer';
import '../styles/globals.scss';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Helpdesk Ticket System - Accessible Support Ticket Management',
  description: 'An accessible CRUD application for managing support tickets with full keyboard navigation and screen reader support',
  keywords: ['helpdesk', 'support', 'tickets', 'accessible', 'a11y'],
  authors: [{ name: 'Helpdesk Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SkipLink />
        <nav className={styles.navbar} aria-label="Main navigation">
          <div className={styles.container}>
            <Link href="/" className={styles.logo}>
              <span aria-hidden="true">🎫</span> TicketFlow
            </Link>
            <Link href="/new" className={styles.createLink}>
              + New Ticket
            </Link>
          </div>
        </nav>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}