'use client';

import { useEffect, useState } from 'react';
import axios from '@/utils/axios';
import toast from 'react-hot-toast';

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskToEdit, setTaskToEdit] = useState<{ _id?: string; title: string; done?: boolean }>({ title: '', done: false });

  useEffect(() => {
    axios.get('/tasks').then(res => setTasks(res.data));
  }, []);

  const openModal = (task?: any) => {
    if (task) {
      setTaskToEdit(task);
    } else {
      setTaskToEdit({ title: '', done: false });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit({ title: '', done: false });
  };

  const saveTask = async () => {
    try {
      if (taskToEdit._id) {
        // Update existing
        const res = await axios.patch(`/tasks/${taskToEdit._id}`, { title: taskToEdit.title, done: taskToEdit.done });
        setTasks(prev => prev.map(t => (t._id === taskToEdit._id ? res.data : t)));
        toast.success('Task updated');
      } else {
        // Add new
        const res = await axios.post('/tasks', { title: taskToEdit.title });
        setTasks(prev => [...prev, res.data]);
        toast.success('Task added');
      }
      closeModal();
    } catch {
      toast.error('Failed to save task');
    }
  };

  const toggleDone = async (id: string, done: boolean) => {
    try {
      const res = await axios.patch(`/tasks/${id}`, { done: !done });
      setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
      toast.success(!done ? 'Marked as done' : 'Marked as not done');
    } catch {
      toast.error('Failed to update task');
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="btn btn-primary" onClick={() => openModal()}>
          Add Task
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.map(task => (
          <li
            key={task._id}
            className="flex items-center justify-between bg-base-200 p-4 rounded shadow"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-success"
                checked={task.done}
                onChange={() => toggleDone(task._id, task.done)}
              />
              <span className={task.done ? 'line-through text-gray-400' : ''}>
                {task.title}
              </span>
            </div>
            <button className="btn btn-sm btn-outline" onClick={() => openModal(task)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box space-y-4">
            <h3 className="font-bold text-lg">{taskToEdit._id ? 'Edit Task' : 'Add New Task'}</h3>

            <input
              type="text"
              placeholder="Task Title"
              className="input input-bordered w-full"
              value={taskToEdit.title}
              onChange={e => setTaskToEdit({ ...taskToEdit, title: e.target.value })}
            />

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-success"
                checked={taskToEdit.done}
                onChange={e => setTaskToEdit({ ...taskToEdit, done: e.target.checked })}
              />
              <span>Done</span>
            </label>

            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveTask} disabled={!taskToEdit.title.trim()}>
                {taskToEdit._id ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
