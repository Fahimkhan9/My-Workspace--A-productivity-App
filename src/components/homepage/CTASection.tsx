'use client';

import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section
      className="relative py-20 bg-primary text-primary-content bg-[url('/pattern.svg')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>

      <div className="relative z-10 container mx-auto px-4 text-center space-y-6">
        <h2 className="text-4xl font-bold">Ready to boost your productivity?</h2>
        <p className="max-w-xl mx-auto text-lg opacity-90">
          Organize your thoughts, manage your tasks, and let AI help you summarize it all — all in one app.
        </p>
        <a
          href="/dashboard/notes"
          className="btn btn-secondary btn-wide text-base flex items-center justify-center gap-2 mx-auto"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
