import { Inter } from 'next/font/google';

import './global.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Orbitto | Личный кабинет',
  description: 'Панель управления инженера Orbitto.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
        <div id="modals" />
      </body>
    </html>
  );
}
