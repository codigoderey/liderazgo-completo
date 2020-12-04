import User from '../../models/users';
import jwt from 'jsonwebtoken';
import Cors from 'cors';
import connectDB from '../../utils/connectDB';

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
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT);
    const users = await User.find({ _id: { $ne: userId } });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please login again');
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
