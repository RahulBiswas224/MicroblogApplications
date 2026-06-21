import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure multer for profile uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

//  REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Missing fields" });

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: "Username exists" });

    const hashed = await bcrypt.hash(password, 8);
    const user = new User({ username, password: hashed });
    await user.save();
    req.session.userId = user._id;
    res.json({
      user: {
        _id: user._id,
        username: user.username,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    req.session.userId = user._id;
    res.json({
      user: {
        _id: user._id,
        username: user.username,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

//  GET CURRENT USER
router.get("/me", async (req, res) => {
  try {
    if (!req.session.userId)
      return res.status(401).json({ error: "Not authenticated" });
    const user = await User.findById(req.session.userId);
    res.json({
      _id: user._id,
      username: user.username,
      profilePhoto: user.profilePhoto,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  UPDATE PROFILE (username + photo)
router.put("/update", upload.single("profilePhoto"), async (req, res) => {
  try {
    if (!req.session.userId)
      return res.status(401).json({ error: "Not authenticated" });

    const { username } = req.body;
    const updateData = {};
    if (username) updateData.username = username;
    if (req.file) updateData.profilePhoto = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(req.session.userId, updateData, {
      new: true,
    });

    res.json({
      _id: user._id,
      username: user.username,
      profilePhoto: user.profilePhoto,
    });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

//  REMOVE PHOTO
router.delete("/remove-photo", async (req, res) => {
  try {
    if (!req.session.userId)
      return res.status(401).json({ error: "Not authenticated" });

    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { $unset: { profilePhoto: "" } },
      { new: true }
    );

    res.json({ success: true, profilePhoto: null });
  } catch (err) {
    res.status(500).json({ error: "Error removing photo" });
  }
});

// DELETE ALL POSTS
router.delete("/delete-all-posts", async (req, res) => {
  try {
    if (!req.session.userId)
      return res.status(401).json({ error: "Not authenticated" });

  
    await Post.deleteMany({}); // deletes all documents in Post collection

    res.json({ success: true, message: "All posts deleted" });
  } catch (err) {
    console.error("Delete all posts failed:", err);
    res.status(500).json({ error: "Failed to delete posts" });
  }
});


export default router;
