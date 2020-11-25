import User from '../../models/users';
import Post from '../../models/posts';
import jwt from 'jsonwebtoken';
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

export default (req, res) => {
  switch (req.method) {
    case 'GET':
      handleGetRequest(req, res);
      break;

    case 'PUT':
      handlePutRequest(req, res);
      break;

    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

const handleGetRequest = async (req, res) => {
  await runMiddleware(req, res, cors);

  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }

  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT);

    const user = await User.findOne({ _id: userId }).populate({
      path: 'bookmarked.post',
      model: Post,
    });

    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.send(403).send('Token inválido');
  }
};

const handlePutRequest = async (req, res) => {
  await runMiddleware(req, res, cors);

  const { _id, role } = req.body;

  await User.findOneAndUpdate({ _id }, { role });

  res.status(203).send('Usuario actualizado');
};

export const config = {
  api: {
    externalResolver: true,
  },
};
