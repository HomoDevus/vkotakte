import User from '../models/user';
import { Request, Response } from 'express';
import { decodeJWT } from '../helpers';
import { mapUserResponse, mapUserUpdate } from '../mappers';

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });

    if (user) {
      const { name, email, age, city, avatar } = user;
      const userData = {
        id: user._id,
        name,
        email,
        age,
        city,
        avatar,
      };

      res.json(userData);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    let token = req.headers.authorization;

    if (!token)
      return res.status(401).send('Access Denied / Unauthorized request');

    const tokenData = decodeJWT(token);

    let user = await User.findOne({ _id: tokenData.id });

    if (user == null)
      return res.status(404).send('User with given id not found');

    const updatedUser = await Object.assign(
      user,
      mapUserUpdate(req.body)
    ).save();

    res.json(mapUserResponse(updatedUser));
  } catch (err) {
    res.status(500);
  }
};
