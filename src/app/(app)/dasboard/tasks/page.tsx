'use client';
import { useEffect, useState } from 'react';
import axios from '@/utils/axios';

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    axios.get('/tasks').then(res => setTasks(res.data));
  }, []);

  const addTask = async () => {
    const res = await axios.post('/tasks', { title: taskTitle });
    setTasks(prev => [...prev, res.data]);
    setTaskTitle('');
  };

  const toggleDone = async (id: string, done: boolean) => {
    const res = await axios.put(`/tasks/${id}`, { done: !done });
    setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input className="input input-bordered flex-grow" placeholder="Task title" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} />
        <button className="btn btn-primary" onClick={addTask}>Add</button>
      </div>

      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task._id} className="flex items-center justify-between bg-base-200 p-3 rounded">
            <span className={task.done ? 'line-through' : ''}>{task.title}</span>
            <button className="btn btn-xs btn-success" onClick={() => toggleDone(task._id, task.done)}>
              {task.done ? 'Undo' : 'Done'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
