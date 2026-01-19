import type { Metadata } from 'next';
import Link from 'next/link';
import '../styles/globals.scss';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Helpdesk Ticket System',
  description: 'CRUD for support tickets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className={styles.navbar}>
          <div className={styles.container}>
            <Link href="/" className={styles.logo}>
              Helpdesk
            </Link>
            <Link href="/new" className={styles.createLink}>
              + New Ticket
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}