// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Post from '../../models/posts';
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

    case 'DELETE':
      handleDeleteRequest(req, res);
      break;

    default:
      res
        .status(500)
        .json({ msg: `Request ${req.method} is just not allowed` });
  }
};

const handlePostRequest = async (req, res) => {
  try {
    runMiddleware(req, res, cors);

    // data content from body
    const { _id, user, text } = req.body;

    // find post to add comment based on post id
    const post = await Post.findOne({ _id });

    const newPostComment = {
      user,
      text,
    };

    post.comments.push(newPostComment);

    // save comment
    await post.save();

    // return comment
    return res.status(200).json(newPostComment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

const handlePutRequest = async (req, res) => {
  try {
    runMiddleware(req, res, cors);

    // data content from body
    const post = await Post.findOne({ _id: req.body.query });

    if (req.body.action === 'editar') {
      post.comments[req.body.commentIndex] = req.body.payload;

      await post.save();

      return res.status(200).json(post);
    } else if (req.body.action === 'eliminar') {
      post.comments.splice(req.body.commentIndex, 1);

      await post.save();

      return res.status(200).json(post);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

const handleDeleteRequest = async (req, res) => {
  try {
    runMiddleware(req, res, cors);

    console.log(req.body);
    res.status(200).send('Comment deleted');
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
