const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Route 1: Fetch all notes belong to a user using POST "/api/notes/fetchallnotes".
// Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Route 2: Add a note to a signed user using POST "/api/notes/addnote" belong to user which is already signed in.
// Login required.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      //console.log(req.user);
      const { title, description, tag } = req.body;

      // if there are validation errors, return bad request and the errors.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = await Note.create({
        title,
        description,
        tag,
        user: req.user.id,
      });
      res.send(note);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 3: Update a existing note using PUT "/api/notes/updatenote".
// Login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    let newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow updation only if note belong to signed user.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// Route 4: Delete a existing note using DELETE "/api/notes/deletenote".
// Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if note belong to signed user.
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
