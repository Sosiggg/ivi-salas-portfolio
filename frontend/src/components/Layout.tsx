import { ReactNode } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps { children: ReactNode }

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b border-gray-200 dark:border-gray-800 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-950/70 sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">Ivi Salas</Link>
          <nav className="hidden md:flex gap-4 text-sm">
            <Link href="/projects" className="hover:text-brand-500 transition-colors">Projects</Link>
            <Link href="/skills" className="hover:text-brand-500 transition-colors">Skills</Link>
            <Link href="/experience" className="hover:text-brand-500 transition-colors">Experience</Link>
            <Link href="/certificates" className="hover:text-brand-500 transition-colors">Certificates</Link>
            <Link href="/contact" className="hover:text-brand-500 transition-colors">Contact</Link>
          </nav>
          <div className="ml-auto"><ThemeToggle /></div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ivi Salas. All rights reserved.
      </footer>
    </div>
  );
}
