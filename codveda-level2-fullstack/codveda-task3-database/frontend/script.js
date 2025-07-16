const userList = document.getElementById('userList');
const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

let editId = null;

async function fetchUsers() {
  userList.innerHTML = "Loading...";
  const res = await fetch('http://localhost:3000/users');
  const users = await res.json();
  userList.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `${user.name} (${user.email})
      <button onclick="editUser('${user._id}', '${user.name}', '${user.email}')">✏️ Edit</button>
      <button onclick="deleteUser('${user._id}')">❌ Delete</button>`;
    userList.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = {
    name: nameInput.value,
    email: emailInput.value
  };

  const url = editId ? `http://localhost:3000/users/${editId}` : 'http://localhost:3000/users';
  const method = editId ? 'PUT' : 'POST';

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

  nameInput.value = '';
  emailInput.value = '';
  editId = null;
  fetchUsers();
});

async function deleteUser(id) {
  await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });
  fetchUsers();
}

function editUser(id, name, email) {
  editId = id;
  nameInput.value = name;
  emailInput.value = email;
}

fetchUsers();