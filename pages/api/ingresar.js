import User from '../../models/users';
import connectDB from '../../utils/connectDB';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

  const { email, password } = req.body;

  try {
    // check if user exist with provided email
    const user = await User.findOne({ email }).select('+password');

    // if no user exist return error
    if (!user) {
      return res.status(404).send('Tus credenciales son incorrectos');
    }

    // if user password matches db password
    const passwordsMatch = await bcrypt.compare(password, user.password);

    // generate token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT, {
        expiresIn: '7d',
      });
      // send token to client
      res.status(200).json(token);
    } else {
      res.status(401).send('Tus credenciales son incorrectos');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al iniciar sesión');
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
