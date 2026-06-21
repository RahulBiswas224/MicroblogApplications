import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function Settings({ user, onAuthChange }) {
  const [username, setUsername] = useState(user?.username || '');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    if (file) formData.append('profilePhoto', file);

    try {
      await axios.put('/api/auth/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile updated successfully');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  const handleRemovePhoto = async () => {
    try {
      await axios.delete('/api/auth/remove-photo');
      alert('Profile photo removed');
      window.location.reload();
    } catch (err) {
      alert('Error removing photo');
    }
  };

  const handleClearPosts = async () => {
    if (!window.confirm('Are you sure you want to delete all your posts?')) return;
    try {
      await axios.delete('/api/posts/clear');
      alert('All posts deleted');
      window.location.reload();
    } catch (err) {
      alert('Error clearing posts');
    }
  };

  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    onAuthChange(null);
    navigate('/');
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>MicroBlog</h2>
        <ul>
          <li onClick={() => navigate('/dashboard')}>
            <FaHome className="icon" /> Home
          </li>
          <li className="active">
            <FaCog className="icon" /> Settings
          </li>
          <li onClick={handleLogout} className="logout">
            <FaSignOutAlt className="icon" /> Logout
          </li>
        </ul>

        <div className="profile">
          <img
            src={
              user?.profilePhoto
                ? `http://localhost:5000${user.profilePhoto}`
                : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
            }
            alt="profile"
          />
          <span>{user?.username}</span>
        </div>
      </aside>

      {/* Settings Form */}
      <main className="settings-container">
        <div className="settings-card">
          <h2>Settings</h2>

          <form onSubmit={handleUpdate}>
            <label>Change Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter new username"
            />

            <label>Change Profile Photo:</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <button type="submit" className="update-btn">
              Save Changes
            </button>
          </form>

          <button onClick={handleRemovePhoto} className="remove-btn">
            Remove Photo
          </button>

          <button onClick={handleClearPosts} className="clear-btn">
            Clear All Posts
          </button>
        </div>
      </main>
    </div>
  );
}
