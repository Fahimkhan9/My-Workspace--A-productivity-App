'use client';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="p-6">
      <nav className="tabs tabs-lift tabs-lg">
      

      <Link
        href="/dashboard/notes"
        className={`tab${pathname === '/dashboard/notes' ? ' tab-active' : ''}`}
      >
        Notes
      </Link>
      <Link
        href="/dashboard/tasks"
        className={`tab${pathname === '/dashboard/tasks' ? ' tab-active' : ''}`}
      >
        Tasks
      </Link>
      </nav>
      {/* <nav role="tablist" className="tabs tabs-lift tabs-lg">
         <Link href="/dashboard/notes" className="tab">Notes</Link>
        <Link href="/dashboard/tasks" className="tab">Tasks</Link>
</nav> */}
        <Toaster position="top-right" />
      {children}
    </div>
  );
}
