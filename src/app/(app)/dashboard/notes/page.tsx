'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axios';
import toast from 'react-hot-toast';

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', content: '', _id: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('/notes').then(res => setNotes(res.data));
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
      await axios.delete(`/notes/${id}`);
      setNotes(prev => prev.filter(n => n._id !== id));
      toast.success('Note deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="btn btn-primary" onClick={() => openModal()}>Add Note</button>
      </div>

     <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
  {notes.length === 0 ? (
    <p className="text-center col-span-full text-gray-500 mt-8">No notes created yet</p>
  ) : (
    notes.map(note => (
      <div key={note._id} className="card bg-base-200 p-4 shadow">
        <h3 className="font-bold text-lg">{note.title}</h3>
        <p className="text-sm mt-1">{note.content}</p>
        <div className="mt-3 flex gap-2">
          <button className="btn btn-sm btn-outline" onClick={() => openModal(note)}>Edit</button>
          <button className="btn btn-sm btn-error" onClick={() => deleteNote(note._id)}>Delete</button>
        </div>
      </div>
    ))
  )}
</div>

      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box space-y-3">
            <h3 className="font-bold text-lg">{form._id ? 'Edit Note' : 'New Note'}</h3>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Content"
              className="textarea textarea-bordered w-full"
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
            />
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
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
