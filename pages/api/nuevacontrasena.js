import User from '../../models/users';
import connectDB from '../../utils/connectDB';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import bcrypt from 'bcrypt';
import { contrasenaActualizada } from '../../utils/emails/constrasenaActualizada';
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
    const { token } = req.query;
    await User.findOne({
      token,
      expira: {
        $gt: Date.now(),
      },
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
  }
};

const handlePutRequest = async (req, res) => {
  await runMiddleware(req, res, cors);

  try {
    const { email, password } = req.body;

    if (!isEmail(email)) {
      return res.status(422).send('El correo electrónico no es válido');
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send('La contraseña debe contener al menos 6 caracteres');
    }

    // if does not exist, hash password
    const passwordhash = await bcrypt.hash(password, 10);

    // check if user exists in db
    const user = await User.findOneAndUpdate(
      { email },
      { password: passwordhash }
    );

    const name = user.name;

    if (!user) {
      return res.status(422).send(`Ese correo no está registrado`);
    }

    await user.save();

    contrasenaActualizada({ name, email });

    return res.status(200).send('La contraseña se ha actualizado');
  } catch (error) {
    console.error(error);
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
