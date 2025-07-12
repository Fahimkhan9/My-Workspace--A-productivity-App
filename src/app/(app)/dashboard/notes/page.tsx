'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axios';
import toast from 'react-hot-toast';
import MDEditor from '@uiw/react-md-editor';

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', content: '', _id: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingNotes, setDeletingNotes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [loadingSummaries, setLoadingSummaries] = useState<Record<string, boolean>>({});
  const [aiSummaries, setAiSummaries] = useState<Record<string, string>>({});

  useEffect(() => {
    axios.get('/notes')
      .then(res => setNotes(res.data))
      .catch(() => toast.error('Failed to load notes'))
      .finally(() => setIsLoading(false));
  }, []);

  const openModal = (note = { title: '', content: '', _id: '' }) => {
    setForm(note);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (form._id) {
        const res = await axios.patch(`/notes/${form._id}`, form);
        setNotes(prev => prev.map(n => (n._id === form._id ? res.data : n)));
        toast.success('Note updated');
      } else {
        const res = await axios.post('/notes', form);
        setNotes(prev => [...prev, res.data]);
        toast.success('Note added');
      }
      setForm({ title: '', content: '', _id: '' });
      setIsModalOpen(false);
    } catch {
      toast.error('Failed to save note');
    }
  };

  const deleteNote = async (id: string) => {
    try {
      setDeletingNotes(prev => [...prev, id]);
      await axios.delete(`/notes/${id}`);
      setNotes(prev => prev.filter(n => n._id !== id));
      toast.success('Note deleted');
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeletingNotes(prev => prev.filter(noteId => noteId !== id));
    }
  };

 
  const summarizeNote = async (id: string, content: string) => {
    try {
      setLoadingSummaries(prev => ({ ...prev, [id]: true }));
      setAiSummaries(prev => ({ ...prev, [id]: '' }));

      const res = await axios.post('/notes/summarize', { content });

      setAiSummaries(prev => ({ ...prev, [id]: res.data.summary }));
      toast.success('AI summary generated');
    } catch {
      toast.error('AI summarization failed');
    } finally {
      setLoadingSummaries(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="btn btn-primary" onClick={() => openModal()}>
          Add Note
        </button>
      </div>
  {isLoading ? (
        <div className="flex justify-center mt-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.length === 0 && <p>No notes created yet.</p>}
        {notes.map(note => (
          <div key={note._id} className="card bg-base-200 p-4 shadow flex flex-col">
            <h3 className="font-bold text-lg">{note.title}</h3>
            <div className="prose mt-2">
              <MDEditor.Markdown source={note.content} />
            </div>

            {/* AI summary if present */}
            {aiSummaries[note._id] && (
              <div className="mt-3 p-3 bg-base-100 rounded border text-sm">
                <strong>AI Summary:</strong>
                <p>{aiSummaries[note._id]}</p>
              </div>
            )}

            <div className="mt-3 flex gap-2">
              <button className="btn btn-sm btn-outline" onClick={() => openModal(note)}>
                Edit
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => deleteNote(note._id)}
                disabled={deletingNotes.includes(note._id)}
              >
                {deletingNotes.includes(note._id) ? 'Deleting...' : 'Delete'}
              </button>
              <button
                className="btn btn-sm btn-info ml-auto"
                onClick={() => summarizeNote(note._id, note.content)}
                disabled={loadingSummaries[note._id]}
              >
                {loadingSummaries[note._id] ? 'Summarizing...' : 'Summarize with AI'}
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
      

      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box space-y-3" data-color-mode="light">
            <h3 className="font-bold text-lg">{form._id ? 'Edit Note' : 'New Note'}</h3>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />

            <MDEditor
              height={200}
              value={form.content}
              onChange={value => setForm({ ...form, content: value || '' })}
            />

            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={!form.title.trim() || !form.content.trim()}
              >
                {form._id ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
