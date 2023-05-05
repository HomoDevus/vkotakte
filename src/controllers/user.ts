import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { Request, Response } from 'express';

const config = process.env;

// Connect to DB
const db = process.env.DB_HOST;

if (!db) throw Error('Mongodb host is not specified');

mongoose
    .connect(db)
    .then(() => console.log('Connected to mongodb'))
    .catch((err) => console.error('Mongodb connection error', err));

export const register = async (req: Request, res: Response) => {
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);

    // Check if user already exist
    try {
        const foundUser = await User.findOne({ email: req.body.email });

        if (foundUser) {
            return res
                .status(409)
                .send({ message: 'User with this email already exists' });
        }

        // Create an user object
        let user = new User({
            email: req.body.email,
            name: req.body.name,
            password: hasPassword,
            user_type_id: req.body.user_type_id,
        });

        // Save User in the database
        const registeredUser = await user.save();
        // create payload then Generate an access token
        let payload = {
            id: registeredUser._id,
            user_type_id: req.body.user_type_id || 0,
        };

        if (!config.TOKEN_SECRET) throw Error('No token secret specified');

        const token = jwt.sign(payload, config.TOKEN_SECRET);

        res.status(200).send({ token });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user && user.password) {
            const validPass = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPass)
                return res
                    .status(401)
                    .send('Mobile/Email or Password is wrong');

            if (!config.TOKEN_SECRET) throw Error('No token secret specified');
            // Create and assign token
            let payload = { id: user._id, user_type_id: user.user_type_id };
            const token = jwt.sign(payload, config.TOKEN_SECRET);

            res.status(200).header('auth-token', token).send({ token: token });
        } else {
            res.status(401).send('Invalid mobile');
        }
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

// Access auth users only
export const userEvent = (req: Request, res: Response) => {
    let events = [
        {
            _id: '1',
            name: 'Auto Expo',
            description: 'lorem ipsum',
            date: '2012-04-23T18:25:43.511Z',
        },
        {
            _id: '2',
            name: 'Auto Expo',
            description: 'lorem ipsum',
            date: '2012-04-23T18:25:43.511Z',
        },
        {
            _id: '3',
            name: 'Auto Expo',
            description: 'lorem ipsum',
            date: '2012-04-23T18:25:43.511Z',
        },
    ];

    res.json(events);
};

export const adminEvent = (req: Request, res: Response) => {
    let specialEvents = [
        {
            _id: '1',
            name: 'Auto Expo Special',
            description: 'lorem ipsum',
            date: '2012-04-23T18:25:43.511Z',
        },
        {
            _id: '2',
            name: 'Auto Expo Special',
            description: 'lorem ipsum',
            date: '2012-04-23T18:25:43.511Z',
        },
        {
            _id: '3',
            name: 'Auto Expo Special',
            description: 'lorem ipsum',
            date: '2012-04-23T18:25:43.511Z',
        },
        {
            _id: '4',
            name: 'Auto Expo Special',
            description: 'lorem ipsum',
            date: '2012-04-23T18:25:43.511Z',
        },
        {
            _id: '5',
            name: 'Auto Expo Special',
            description: 'lorem ipsum',
            date: '2012-04-23T18:25:43.511Z',
        },
        {
            _id: '6',
            name: 'Auto Expo Special',
            description: 'lorem ipsum',
            date: '2012-04-23T18:25:43.511Z',
        },
    ];

    res.json(specialEvents);
};
