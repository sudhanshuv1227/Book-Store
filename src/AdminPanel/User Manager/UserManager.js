import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:9090/user/all");
      console.log("Fetched users:", res.data); // Debug
      setUsers(res.data);
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (userId) => {
    try {
      const res = await axios.put(`http://localhost:9090/user/toggle-status/${userId}`);
      const updatedUser = res.data;

      // Update only the toggled user in the list with the correct backend value
      const updatedUsers = users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);

      alert(`User has been ${updatedUser.status ? 'activated' : 'deactivated'}.`);
    } catch (err) {
      console.error("Error toggling user status:", err);
      alert("Failed to toggle user status.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h5 className="mb-3">All Registered Users</h5>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Toggle</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No users found.</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.emailId}</td>
                    <td>
                      <span className={`badge bg-${user.role === 'ADMIN' ? 'danger' : 'secondary'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge bg-${user.status ? 'success' : 'warning'}`}>
                        {user.status ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${user.status ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.status ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserManager;
