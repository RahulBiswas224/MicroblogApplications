import express from "express";
import multer from "multer";
import path from "path";
import User from "../models/User.js";

const router = express.Router();

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where photos will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage });

// Route: Upload profile photo
router.post("/profile", upload.single("photo"), async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Not authenticated" });

    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.profilePhoto = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ message: "Photo uploaded successfully", profilePhoto: user.profilePhoto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
