// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Post from '../../models/posts';
import User from '../../models/users';
import connectDB from '../../utils/connectDB';
import Cors from 'cors';
import shortid from 'shortid';

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

    case 'POST':
      handlePostRequest(req, res);
      break;

    case 'DELETE':
      handleDeleteRequest(req, res);
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
  try {
    // Run the middleware
    await runMiddleware(req, res, cors);

    // get posts
    const posts = await Post.find()
      .populate({
        path: 'postBy',
        model: User,
      })
      .sort({
        updatedAt: -1,
      });

    // return posts to display
    return res.status(200).json(posts);
  } catch (error) {
    // catch any possible error
    console.error(error.message);
  }
};

const handlePostRequest = async (req, res) => {
  try {
    // Run the middleware
    await runMiddleware(req, res, cors);
    const { category, title, slug, blurb, content, postBy } = req.body;

    const publicacion = new Post({
      category,
      title,
      slug: slug + '-' + shortid.generate(),
      blurb,
      content,
      postBy,
    });

    publicacion.save();

    res.status(200).json({ message: 'Post added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const handlePutRequest = async (req, res) => {
  try {
    // Run the middleware
    await runMiddleware(req, res, cors);

    const post = await Post.findOneAndUpdate({ _id: req.body._id }, req.body, {
      new: true,
    });

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

// // deleting posts
// const handleDeleteRequest = async (req, res) => {
//   // Run de middleware
//   await runMiddleware(req, res, cors);

//   const { postId, userId } = req.query;

//   if (!('authorization' in req.headers)) {
//     return res.status(401).send('No estás autorizado');
//   }

//   // await Post.findOneAndDelete({ _id: postId });

//   const users = await User.find();
//   const musers = users.map((um) => {
//     if (um.bookmarked.length) {
//       const arrayToMap = um.bookmarked;
//       const lastArr = arrayToMap.filter((arr) => {
//         return arr.post != postId;
//       });
//       return lastArr;
//     }
//   });

//   console.log(musers);

//   res.status(200);
// };

export const config = {
  api: {
    externalResolver: true,
  },
};
