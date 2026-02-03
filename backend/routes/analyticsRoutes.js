const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const protect = require("../middleware/auth");

// 1) existing (пример): GET /api/analytics/by-category
router.get("/by-category", async (req, res) => {
  try {
    const result = await Course.aggregate([
      { $match: { category: { $ne: null } } },
      {
        $group: {
          _id: "$category",
          totalCourses: { $sum: 1 },
          avgPrice: { $avg: "$price" }
        }
      },
      { $sort: { totalCourses: -1 } }
    ]);

    res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// ✅ 12-й endpoint: GET /api/analytics/my-summary
router.get("/my-summary", protect, async (req, res) => {
  try {
    const userId = req.user; // middleware кладёт сюда id

    const result = await Course.aggregate([
      // Stage 1: only my courses
      { $match: { createdBy: userId } },

      // Stage 2: compute lessonsCount per course (embedded array)
      {
        $addFields: {
          lessonsCount: { $size: { $ifNull: ["$lessons", []] } }
        }
      },

      // Stage 3: group into one summary document
      {
        $group: {
          _id: "$createdBy",
          totalCourses: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          totalLessons: { $sum: "$lessonsCount" }
        }
      },

      // Stage 4: shape output
      {
        $project: {
          _id: 0,
          userId: "$_id",
          totalCourses: 1,
          avgPrice: { $round: ["$avgPrice", 2] },
          minPrice: 1,
          maxPrice: 1,
          totalLessons: 1
        }
      }
    ]);

    // Если нет курсов, вернуть нули
    if (result.length === 0) {
      return res.json({
        userId,
        totalCourses: 0,
        avgPrice: 0,
        minPrice: 0,
        maxPrice: 0,
        totalLessons: 0
      });
    }

    res.json(result[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
