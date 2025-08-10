import React, { useEffect, useMemo, useState } from 'react';
import api from '../api/client';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'gunjivenkatesh072@gmail.com';

const Admin = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('authUser') || 'null'); } catch { return null; }
  });
  const isAdmin = useMemo(() => authUser?.email === ADMIN_EMAIL, [authUser]);

  const [form, setForm] = useState({ name: '', category: 'men', image: '', new_price: '', old_price: '' });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const u = localStorage.getItem('authUser');
    if (u) setAuthUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
      return;
    }
    if (!isAdmin) {
      setError('Unauthorized: admin access only');
    } else {
      fetchMessages();
    }
  }, [isAdmin, navigate]);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    setError('');
    try {
      const res = await api.get('/support/messages');
      setMessages(res.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load messages');
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg('');
    setError('');
    try {
      const payload = {
        name: form.name,
        category: form.category,
        image: form.image,
        new_price: Number(form.new_price),
        old_price: Number(form.old_price),
      };
      await api.post('/products', payload);
      setSaveMsg('Product added');
      setForm({ name: '', category: 'men', image: '', new_price: '', old_price: '' });
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to add product');
    } finally {
      setSaving(false);
    }
  };

  if (!localStorage.getItem('authToken')) return null;

  return (
    <div style={{ maxWidth: 960, margin: '40px auto', padding: 16 }}>
      <h1>Admin Panel</h1>
      {!isAdmin && (
        <p style={{ color: 'red' }}>{error || 'Unauthorized'}</p>
      )}
      {isAdmin && (
        <>
          <section style={{ marginBottom: 32 }}>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 600 }}>
              <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kids</option>
              </select>
              <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
              <input type="number" step="0.01" placeholder="Price" value={form.new_price} onChange={(e) => setForm({ ...form, new_price: e.target.value })} required />
              <input type="number" step="0.01" placeholder="Old Price" value={form.old_price} onChange={(e) => setForm({ ...form, old_price: e.target.value })} />
              <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Add Product'}</button>
              {saveMsg && <p style={{ color: 'green' }}>{saveMsg}</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
          </section>

          <section>
            <h2>Contact Messages</h2>
            {loadingMessages ? (
              <p>Loading messages...</p>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {messages.length === 0 && <p>No messages</p>}
                {messages.map((m) => (
                  <div key={m.id} style={{ border: '1px solid #ddd', borderRadius: 6, padding: 12 }}>
                    <p><strong>{m.name}</strong> ({m.email})</p>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{m.message}</p>
                    <p style={{ fontSize: 12, color: '#666' }}>{new Date(m.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Admin;
