import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, editingUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onSubmit({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">{editingUser ? 'Update' : 'Add'} User</button>
    </form>
  );
};

export default UserForm;
