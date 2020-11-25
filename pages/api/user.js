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
    const { _id } = req.query;

    const userPosts = await Post.find({ postBy: _id });

    const user = await User.findOne({ _id }).populate({
      path: 'bookmarked.post',
      model: Post,
    });

    res.status(200).json({ userPosts, user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener usuario');
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
