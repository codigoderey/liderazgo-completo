import mongoose from 'mongoose';

const { String, ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema(
  {
    // reference users
    postBy: {
      type: ObjectId,
      ref: 'user',
    },

    title: {
      type: String,
      required: true,
    },

    blurb: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    comments: [
      {
        user: {
          type: ObjectId,
          ref: 'user',
        },
        text: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.post || mongoose.model('post', PostSchema);
