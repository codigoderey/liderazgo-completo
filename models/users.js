import mongoose from 'mongoose';

const { String, ObjectId, Date } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    token: String,
    expira: Date,
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      required: true,
      default: 'usuario',
      enum: ['usuario', 'administrador', 'root'],
    },

    bookmarked: [
      {
        post: {
          type: ObjectId,
          ref: 'post',
          sparse: true,
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

export default mongoose.models.user || mongoose.model('user', UserSchema);
