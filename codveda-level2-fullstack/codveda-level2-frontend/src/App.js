import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:3000/users');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addOrUpdateUser = async (user) => {
    if (editingIndex !== null) {
      await fetch(`http://localhost:3000/users/${editingIndex}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      setEditingIndex(null);
    } else {
      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
    }
    fetchUsers();
  };

  const deleteUser = async (index) => {
    await fetch(`http://localhost:3000/users/${index}`, {
      method: 'DELETE'
    });
    fetchUsers();
  };

  const editUser = (index) => {
    setEditingIndex(index);
  };

  return (
    <div className="App">
      <h1>👥 User Directory (React)</h1>
      <UserForm
        onSubmit={addOrUpdateUser}
        editingUser={editingIndex !== null ? users[editingIndex] : null}
      />
      <UserList users={users} onEdit={editUser} onDelete={deleteUser} />
    </div>
  );
}

export default App;
