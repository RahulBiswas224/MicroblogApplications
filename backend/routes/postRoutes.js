import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";

const router = express.Router();

//  Get all posts (visible to everyone logged in)
router.get("/", async (req, res) => {
  try {
    if (!req.session.userId)
      return res.status(401).json({ error: "Not authenticated" });

    const posts = await Post.find()
      .populate("userId", "username profilePhoto")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Create a post (only logged-in user's post is added)
router.post("/", async (req, res) => {
  try {
    if (!req.session.userId)
      return res.status(401).json({ error: "Not authenticated" });

    const { text } = req.body;
    const user = await User.findById(req.session.userId);

    const post = new Post({
      userId: user._id,
      text,
      time: new Date().toLocaleString(),
    });

    const savedPost = await post.save();
    const populatedPost = await savedPost.populate("userId", "username profilePhoto");
    res.json(populatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE ALL POSTS
router.delete("/clear", async (req, res) => {
  try {
    if (!req.session.userId)
      return res.status(401).json({ error: "Not authenticated" });

    const result = await Post.deleteMany({ userId: req.session.userId });
    console.log("Deleted posts count:", result.deletedCount);

    res.json({ success: true, message: `${result.deletedCount} posts deleted` });
  } catch (err) {
    console.error("Delete user posts failed:", err);
    res.status(500).json({ error: "Failed to delete posts" });
  }
});

export default router;
