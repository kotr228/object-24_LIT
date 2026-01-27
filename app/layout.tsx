import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { getSettings } from '@/actions/settings';

export const metadata: Metadata = {
  title: 'Олександрійський ліцей інформаційних технологій',
  description: 'Офіційний веб-сайт Олександрійського ліцею інформаційних технологій',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="uk" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Header logoType={settings.logoType as 'new' | 'old'} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
