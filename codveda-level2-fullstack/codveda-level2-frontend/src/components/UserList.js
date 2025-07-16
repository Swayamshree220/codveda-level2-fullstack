import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) return <p>No users found</p>;

  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          {user.name} ({user.email})
          <button onClick={() => onEdit(index)}>✏️ Edit</button>
          <button onClick={() => onDelete(index)}>❌ Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
