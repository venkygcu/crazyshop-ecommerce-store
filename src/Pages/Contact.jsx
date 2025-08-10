import React, { useState } from 'react';
import api from '../api/client';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const ENABLE_MOCK = String(process.env.REACT_APP_ENABLE_MOCK_DATA).toLowerCase() === 'true';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (ENABLE_MOCK) {
        await new Promise((r) => setTimeout(r, 500));
        setSuccess('Message sent successfully.');
        setName(''); setEmail(''); setMessage('');
        return;
      }
      await api.post('/support/contact', { name, email, message });
      setSuccess('Message sent successfully.');
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page" style={{ maxWidth: 640, margin: '40px auto', padding: 20 }}>
      <h1>Contact Support</h1>
      <div style={{ margin: '12px 0 24px', padding: 12, background: '#f7f7f7', borderRadius: 6 }}>
        <p style={{ margin: '4px 0' }}>Call: <a href="tel:9986573492">9986573492</a></p>
        <p style={{ margin: '4px 0' }}>Email: <a href="mailto:gunjivenkatesh072@gmail.com">gunjivenkatesh072@gmail.com</a></p>
        <p style={{ margin: '4px 0', fontSize: 12, color: '#666' }}>We typically respond within 24 hours.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" disabled={loading} style={{ marginTop: 16 }}>{loading ? 'Sending...' : 'Send Message'}</button>
      </form>
    </div>
  );
};

export default Contact;
