import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

// Initialize the required fonts for LearnLoop
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  variable: '--font-jakarta',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LearnLoop | Turning Study Time into Playtime',
  description: 'LearnLoop makes studying fun. Instantly turn your boring notes and PDFs into interactive games, flashcards, and quizzes that you actually want to play.',
  keywords: ['Study app', 'Gamified learning', 'Fun study tools', 'Auto flashcards', 'LearnLoop', 'Student hacks', 'Interactive learning'],
  metadataBase: new URL('https://learn-loop-murex.vercel.app'),
  openGraph: {
    title: 'LearnLoop | Stop Studying, Start Playing',
    description: 'Turn your boring notes into fun, interactive learning games instantly. Level up your grades without the burnout.',
    url: 'https://learn-loop-murex.vercel.app',
    siteName: 'LearnLoop',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LearnLoop - Fun Gamified Learning',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" />
      </head>
      <body className={`${jakarta.variable} ${inter.variable} bg-surface text-on-surface font-body min-h-screen selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden`}>
        <ThemeProvider>
          <div className="relative overflow-x-hidden min-h-screen flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
