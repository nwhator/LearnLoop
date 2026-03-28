import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
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
  title: 'LearnLoop | AI-Powered Gamified Learning',
  description: 'Transform your notes, recordings, or links into an interactive gamified learning adventure instantly with AI generated flashcards and quizzes.',
  keywords: ['AI Gamified Learning', 'Auto generate flashcards', 'Study app', 'LearnLoop', 'EdTech'],
  openGraph: {
    title: 'LearnLoop',
    description: 'Transform your notes into an interactive learning adventure.',
    url: 'https://learnloop.app',
    siteName: 'LearnLoop',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LearnLoop - Gamified AI Learning',
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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" />
      </head>
      <body className={`${jakarta.variable} ${inter.variable} bg-surface text-surface-on font-body min-h-screen selection:bg-primary-container selection:text-primary-on`}>
        {children}
      </body>
    </html>
  );
}
