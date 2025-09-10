import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-bold mb-6"
      >
        404
      </motion.h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="inline-block rounded-md bg-brand-600 text-white px-6 py-3 font-medium hover:bg-brand-500 transition-colors">Return Home</Link>
    </div>
  );
}
