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

export default (req, res) => {
  switch (req.method) {
    case 'POST':
      handlePostRequest(req, res);
      break;

    case 'PUT':
      handlePutRequest(req, res);
      break;

    default:
      res
        .status(500)
        .json({ msg: `Request ${req.method} is just not allowed` });
  }
};

const handlePostRequest = async (req, res) => {
  runMiddleware(req, res, cors);

  try {
    const { userId, postId } = req.body;
    const user = await User.findById({ _id: userId });
    const newBookmark = {
      post: postId,
    };
    console.log(newBookmark);
    user.bookmarked.push(newBookmark);
    user.save();
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const handlePutRequest = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const user = await User.findById({ _id: userId });

    const bookmarkedArray = user.bookmarked;

    let theArray = bookmarkedArray.filter((marked) => marked.post == postId);
    theArray[0].remove();
    user.save();
    res.status(200).send('Bookmarked Removed');
  } catch (error) {
    console.error(error.message);
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
