'use client';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('/notes').then(res => setNotes(res.data));
  }, []);

  const createNote = async () => {
    const res = await axios.post('/notes', { title, content });
    setNotes(prev => [...prev, res.data]);
    setTitle('');
    setContent('');
  };

  const deleteNote = async (id: string) => {
    await axios.delete(`/notes/${id}`);
    setNotes(prev => prev.filter(n => n._id !== id));
  };

  return (
    <div>
      <div className="mb-4 space-y-2">
        <input className="input input-bordered w-full" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="textarea textarea-bordered w-full" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <button className="btn btn-primary" onClick={createNote}>Add Note</button>
      </div>

      <div className="grid gap-4">
        {notes.map(note => (
          <div key={note._id} className="card bg-base-200 p-4">
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
            <button className="btn btn-sm btn-error mt-2" onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
