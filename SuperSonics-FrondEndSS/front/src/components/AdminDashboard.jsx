import React, { useState } from "react";
import "../styles/styles.css";

function AdminDashboard() {
  // Sample user data
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      password: "password1",
    },
    {
      id: 2,
      username: "user2",
      email: "user2@example.com",
      password: "password2",
    },
    {
      id: 3,
      username: "user3",
      email: "user3@example.com",
      password: "password3",
    },
    {
      id: 4,
      username: "user4",
      email: "user4@example.com",
      password: "password4",
    },
    {
      id: 5,
      username: "user5",
      email: "user5@example.com",
      password: "password5",
    },
  ]);

  // State for new user fields
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Function to handle editing user data
  const handleEditUser = (id, newData) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, ...newData } : user))
    );
  };

  // Function to handle deleting a user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Function to add a new user
  const handleAddUser = () => {
    const id = users.length + 1;
    setUsers([...users, { id, ...newUser }]);
    setNewUser({ username: "", email: "", password: "" });
  };

  return (
    <div className="admin-dashboard-container">
      <h1 style={{ textAlign: "center" }}> User management</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) =>
                    handleEditUser(user.id, { username: e.target.value })
                  }
                  className="input-field"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={user.email}
                  onChange={(e) =>
                    handleEditUser(user.id, { email: e.target.value })
                  }
                  className="input-field"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={user.password}
                  onChange={(e) =>
                    handleEditUser(user.id, { password: e.target.value })
                  }
                  className="input-field"
                />
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                placeholder="Username"
                className="input-field"
              />
            </td>
            <td>
              <input
                type="text"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="Email"
                className="input-field"
              />
            </td>
            <td>
              <input
                type="text"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                placeholder="Password"
                className="input-field"
              />
            </td>
            <td>
              <button onClick={handleAddUser}>Add User</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;

/*import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "../styles/styles.css";

function AdminDashboard() {
  // State for users
  const [users, setUsers] = useState([]);
  
  // Fetch users from the backend when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to handle editing user data
  const handleEditUser = async (id, newData) => {
    try {
      await axios.put(`/api/users/${id}`, newData);
      setUsers(users.map((user) => (user.id === id ? { ...user, ...newData } : user)));
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  // Function to handle deleting a user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to add a new user
  const handleAddUser = async () => {
    try {
      const newUser = { username: "", email: "", password: "" };
      const response = await axios.post("/api/users", newUser);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1 style={{ textAlign: "center" }}> User management</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => handleEditUser(user.id, { username: e.target.value })}
                  className="input-field"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={user.email}
                  onChange={(e) => handleEditUser(user.id, { email: e.target.value })}
                  className="input-field"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={user.password}
                  onChange={(e) => handleEditUser(user.id, { password: e.target.value })}
                  className="input-field"
                />
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                value={""}
                onChange={() => {}}
                placeholder="Username"
                className="input-field"
              />
            </td>
            <td>
              <input
                type="text"
                value={""}
                onChange={() => {}}
                placeholder="Email"
                className="input-field"
              />
            </td>
            <td>
              <input
                type="text"
                value={""}
                onChange={() => {}}
                placeholder="Password"
                className="input-field"
              />
            </td>
            <td>
              <button onClick={handleAddUser}>Add User</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;*/
