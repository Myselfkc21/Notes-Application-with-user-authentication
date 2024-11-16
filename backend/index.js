import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import mongoose from "mongoose";
import authenticateToken from "./utilities.js";
import User from "./Models/User.modal.js";
import Note from "./Models/note.model.js";
mongoose.connect(
  "mongodb+srv://krishnachaitanya:Mounikittu9603@notesapp.0jb2l.mongodb.net/?retryWrites=true&w=majority&appName=NotesApp"
);
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors({ origin: "*" }));
app.get("/posts", (req, res) => {
  res.json({ data: "dawg" });
});

app.post("/signup", async (req, res) => {
  console.log(req.body);

  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "fullname is missing" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "email is missing" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "password is missing" });
  }

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "user already exists" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, "8YHXrMwQIMHgYzFeT7ttyqNksgzlBiqA");

  return res.json({
    error: false,
    user,
    accessToken,
    message: "success registration",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: true, message: "email is missing" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "password is missing" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ error: true, message: "user not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ error: true, message: "wrong password" });
  }

  const accessToken = jwt.sign({ user }, "8YHXrMwQIMHgYzFeT7ttyqNksgzlBiqA");

  return res.json({
    error: false,
    user,
    accessToken,
    message: "success login",
  });
});

app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user; // Fix here: no destructuring needed

  if (!title) {
    return res.status(400).json({ error: true, message: "title is missing" });
  }
  if (!content) {
    return res.status(400).json({ error: true, message: "content is missing" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags,
      userId: user._id, // use user._id now
    });
    console.log(note); // Check for note object here
    await note.save();
    return res.json({
      error: false,
      message: "note added successfully",
      note,
    });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

app.put("/update-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;
  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "no field to be updated" });
  }
  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: user._id },
      { title: title, content: content, tags: tags, isPinned: isPinned },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ error: true, message: "note not found" });
    }
    await note.save();
    return res.json({
      error: false,
      message: "note updated successfully",
      note,
    });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

app.get("/get-all-notes/", authenticateToken, async (req, res) => {
  const { user } = req.user;
  console.log(user);
  try {
    const notes = await Note.find({ userId: user._id });
    console.log("from  here" + notes);
    return res.json({ error: false, notes, message: "success" });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
});

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;
  try {
    const note = await Note.findByIdAndDelete({
      _id: noteId,
      userId: user._id,
    });
    if (!note) {
      return res.status(404).json({ error: true, message: "note not found" });
    } else {
      return res.json({ error: false, message: "note deleted successfully" });
    }
  } catch (error) {
    return res.status(404).json({ error: true, message: "error" });
  }
});

app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;
  if (!isPinned) {
    return res
      .status(400)
      .json({ error: true, message: "no field to be updated" });
  }
  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: user._id },
      { isPinned: isPinned },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ error: true, message: "note not found" });
    }
    await note.save();
    return res.json({
      error: false,
      message: "note pinned successfully",
      note,
    });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});
app.get("/search-note/", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: true, message: "no query available" });
  }
  try {
    const matchNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
        { tags: { $regex: new RegExp(query, "i") } },
      ],
    });
    console.log(matchNotes);
    if (matchNotes.length > 0) {
      return res.json({
        error: false,
        notes: matchNotes,
        message: "matching notes fund successfully",
      });
    } else {
      return res
        .status(404)
        .json({ error: true, message: "no matching notes found" });
    }
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findById({ _id: user._id });
  if (!isUser) {
    return res.status(404).json({ error: true, message: "user not found" });
  }
  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      id: isUser._id,
      createdOn: isUser.CreatedOn,
    },
    message: "success",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
