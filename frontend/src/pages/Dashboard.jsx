import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCog, FaSignOutAlt } from "react-icons/fa";
import PostCard from "../components/PostCard.jsx";

export default function Dashboard({ user, onAuthChange }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await axios.post("/api/posts", { text });
      setPosts((prev) => [res.data, ...prev]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      onAuthChange(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>MicroBlog</h2>
        <ul>
          <li className="active">
            <FaHome className="icon" /> Home
          </li>
          <li onClick={() => navigate("/settings")}>
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
                : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
            alt="profile"
          />
          <span>{user?.username}</span>
        </div>
      </aside>

      <main className="feed">
        <form className="new-post" onSubmit={handlePost}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
          />
          <button type="submit">Post</button>
        </form>

        <div className="posts">
          {posts.length === 0 ? (
            <p className="empty">No posts yet.</p>
          ) : (
            posts.map((p) => <PostCard key={p._id} post={p} />)
          )}
        </div>
      </main>
    </div>
  );
}
