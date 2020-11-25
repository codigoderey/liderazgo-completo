import User from '../../models/users';
import connectDB from '../../utils/connectDB';
import crypto from 'crypto';
// email template to recover password
import { resetPasword } from '../../utils/emails/recuperarPassword';
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
  switch (req.method) {
    case 'POST':
      handlePostRequest(req, res);
      break;

    default:
      res
        .status(500)
        .json({ msg: `Request ${req.method} is just not allowed` });
  }
};

const handlePostRequest = async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors);

  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('Ese correo no está registrado');
    }

    const name = user.name;

    if (email !== user.email) {
      return res.status(500).send('Ese correo no está registrado en tu cuenta');
    }

    // el usuario existe, generar token
    user.token = crypto.randomBytes(20).toString('hex');
    user.expira = Date.now() + 3600000;

    const resetUrl = `http://${req.headers.host}/nuevacontrasena?token=${user.token}`;

    resetPasword({ name, email, resetUrl });

    // Guardar el usuario
    await user.save();

    return res.status(200).end();
  } catch (error) {
    console.error(error.message);
    return res.status(404).json({
      error: {
        code: 'not_found',
        message: 'The requested end point is missed',
      },
    });
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
