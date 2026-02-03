const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const protect = require("../middleware/auth");

//  CREATE course (только авторизованный)
router.post("/", protect, async (req, res) => {
  try {
    const course = await Course.create({
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      createdBy: req.user, 
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  GET all courses 
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  GET my courses 
router.get("/my", protect, async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET course by id
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE 
router.put("/:id", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.createdBy.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  DELETE 
router.delete("/:id", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.createdBy.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await course.deleteOne();
    res.json({ message: "Course removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  ADD lesson ($push)
router.post("/:id/lessons", protect, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $push: { lessons: req.body } },
      { new: true }
    );
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  REMOVE lesson ($pull)
router.delete("/:id/lessons", protect, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $pull: { lessons: { title: req.body.title } } },
      { new: true }
    );
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
