'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow">
 
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          NoteApp
        </Link>
      </div>

      
      <div className="hidden md:flex gap-2">
        <Link href="/dashboard/notes" className="btn btn-ghost btn-sm">
          Dashboard
        </Link>

        {!user ? (
          <Link href="/login" className="btn btn-primary btn-sm">
            Sign In
          </Link>
        ) : (
          <>
            <div className="flex items-center text-sm">{user.name || user.email}</div>
            <button onClick={logout} className="btn btn-error btn-sm">
              Logout
            </button>
          </>
        )}
      </div>

      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>

        <ul
          tabIndex={0}
          className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-1">
          <li>
            <Link href="/dashboard/notes">Dashboard</Link>
          </li>

          {!user ? (
            <li>
              <Link href="/login">Sign In</Link>
            </li>
          ) : (
            <>
              <li>
                <span className="font-semibold">{user.name || user.email}</span>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
