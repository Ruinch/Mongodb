const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true,
      index: true
    },

    price: {
      type: Number,
      required: true
    },

    lessons: {
      type: [lessonSchema],
      default: []
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

//  Compound index (для сортировки и фильтрации)
courseSchema.index({ category: 1, price: -1 });

module.exports = mongoose.model("Course", courseSchema);
