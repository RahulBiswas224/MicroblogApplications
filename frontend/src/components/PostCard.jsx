import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

export default function PostCard({ post }){
  const [liked, setLiked] = useState(false);
  const avatar = post.userId && post.userId.profilePhoto ? `http://localhost:5000${post.userId.profilePhoto}` : (post.avatar || 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png');
  const username = post.userId ? post.userId.username : (post.user || 'You');
  return (
    <div className="post-card">
      <div className="post-header">
        <img src={avatar} alt="avatar" />
        <div>
          <strong>{username}</strong>
          <small>{post.time}</small>
        </div>
      </div>
      <p className="post-text">{post.text}</p>
      <div className="post-actions">
        <button className={`like-btn ${liked ? 'liked': ''}`} onClick={()=>setLiked(!liked)}><FaHeart /> {liked ? 'Liked' : 'Like'}</button>
      </div>
    </div>
  );
}
