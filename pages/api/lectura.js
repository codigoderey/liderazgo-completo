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

export default (req, res) => {
  switch (req.method) {
    case 'GET':
      handleGetRequest(req, res);
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

const handleGetRequest = async (req, res) => {
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

const handlePutRequest = async (req, res) => {
  // Run de middleware
  await runMiddleware(req, res, cors);

  const { postId } = req.body.params;

  if (!('Authorization' in req.body.headers)) {
    return res.status(401).send('No estás autorizado');
  }
  try {
    const post = await Post.findById({ _id: postId });

    await User.find()
      .populate({
        path: 'bookmarked',
        model: Post,
      })
      .updateMany(
        {},
        { $pull: { bookmarked: { post: post._id } } },
        { multi: true }
      );

    post.archive = true;
    await post.save();
    await Post.deleteMany({ archive: true });

    res.status(200).send('Publicación eliminada correctamente');
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
