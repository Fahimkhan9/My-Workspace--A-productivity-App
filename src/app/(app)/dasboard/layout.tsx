import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6">
      <nav className="tabs tabs-boxed mb-6">
        <Link href="/dashboard/notes" className="tab">Notes</Link>
        <Link href="/dashboard/tasks" className="tab">Tasks</Link>
      </nav>
      {children}
    </div>
  );
}
