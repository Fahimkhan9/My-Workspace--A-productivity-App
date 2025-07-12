'use client';

import { Sparkles, FileText, CheckCircle, Brain } from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: 'Markdown Notes',
    desc: 'Write and edit notes in rich Markdown with preview support.',
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: 'Task Manager',
    desc: 'Track your daily tasks and mark them as done easily.',
  },
  {
    icon: <Brain className="w-8 h-8 text-primary" />,
    title: 'AI Summarization',
    desc: 'Summarize notes instantly using Google Gemini AI.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: 'Beautiful UI',
    desc: 'Modern, responsive design built with Tailwind and DaisyUI.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-base-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Features</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-10">
          All-in-one app for taking notes, managing tasks, and getting AI-powered insights.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className="card bg-base-200 shadow hover:shadow-lg transition duration-300 p-6">
              <div className="mb-4 flex justify-center">{f.icon}</div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
