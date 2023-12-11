import express from 'express';
import { USERDETAILS } from '../model/UserSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.phoneNumber) {
      return res.status(501).send('Username, email, and phoneNumber are required');
    }
    
    const credentials = {
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };
    const user = await USERDETAILS.create(credentials);

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(502).json({ message: error });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await USERDETAILS.find({});

    return res.status(200).json({ count: items.length, data: items });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: error });
  }
});

export default router;
