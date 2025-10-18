import React, { useState } from 'react';
import { apiClient } from '../lib/api';
import { useAuth } from '../context/auth';

export default function ObservationForm({ plant, onSaved }) {
  const { token } = useAuth();
  const client = apiClient(token);
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [height, setHeight] = useState('');
  const [leafCount, setLeafCount] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('plantId', String(plant.id));
    form.append('date', date);
    form.append('heightCm', height);
    form.append('leafCount', leafCount);
    form.append('notes', notes);
    if (file) form.append('image', file);
    await client.post('/api/observations', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    setHeight(''); setLeafCount(''); setNotes(''); setFile(null);
    if (onSaved) onSaved();
  };

  return (
    <form onSubmit={submit}>
      <label>Date</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <label>Height (cm)</label>
      <input value={height} onChange={(e) => setHeight(e.target.value)} />
      <label>Leaf Count</label>
      <input value={leafCount} onChange={(e) => setLeafCount(e.target.value)} />
      <label>Photo</label>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <label>Notes</label>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit">Save Observation</button>
    </form>
  );
}
