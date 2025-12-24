import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gokulapriyan',
  description: 'Portfolio of Gokulapriyan',
  viewport: 'width=device-width, initial-scale=1, minimum-scale=1, user-scalable=0',
  icons: {
    icon: [{ url: '', rel: 'icon' }],
    apple: [{ url: '', rel: 'apple-touch-icon' }],
    shortcut: [''],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:," />
      </head>
      <body>{children}</body>
    </html>
  );
}
