import Post from '../../models/posts';
import User from '../../models/users';
import connectDB from '../../utils/connectDB';
import Cors from 'cors';

connectDB();

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);
  try {
    const { slug } = req.query;

    const post = await Post.findOne({ slug: slug })
      .populate({
        path: 'postBy',
        model: User,
      })
      .populate({
        path: 'comments.user',
        model: User,
      })
      .sort({
        comments: -1,
      });

    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
