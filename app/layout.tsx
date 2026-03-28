import type { Metadata } from 'next';
import './globals.css';

// Import Fontsource for Mindloop fonts
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";

export const metadata: Metadata = {
  title: 'LearnLoop | AI-Powered Gamified Learning',
  description: 'Transform your notes, recordings, or links into an interactive gamified learning adventure instantly with AI generated flashcards and quizzes.',
  keywords: ['LearnLoop', 'AI Learning', 'Gamified Study', 'Education Technology', 'Learning Adventure'],
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
      <body className="bg-background text-foreground font-sans min-h-screen selection:bg-foreground selection:text-background">
        {children}
      </body>
    </html>
  );
}
