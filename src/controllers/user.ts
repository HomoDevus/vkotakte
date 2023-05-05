import User from '../models/user';
import { Request, Response } from 'express';

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
