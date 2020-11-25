import User from '../../models/users';
import connectDB from '../../utils/connectDB';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { newAccountWelcomeEmail } from '../../utils/emails/correoDeBienvenida';
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

  const { name, email, password } = req.body;
  try {
    // validation of name, email, password
    if (!isLength(name, { min: 3, max: 30 })) {
      return res
        .status(422)
        .send('El nombre debe contener entre 3 a 30 caracteres');
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send('La contraseña debe contener al menos 6 caracteres');
    } else if (!isEmail(email)) {
      return res.status(422).send('El correo electrónico no es válido');
    }

    // check if user exists in db
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(422)
        .send(`Usuario ya existe con el correo electrónico ${email}`);
    }
    // if does not exist, hash password
    const hash = await bcrypt.hash(password, 10);

    // create user
    const newUser = await new User({
      name,
      email,
      password: hash,
    });

    newAccountWelcomeEmail({ name, email });

    await newUser.save();

    // create token for new user

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT, {
      expiresIn: '7d',
    });

    res.status(201).json(token);

    // send back token
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al crear la cuenta');
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
