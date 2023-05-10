import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import jwt from 'jsonwebtoken'

const config = process.env

export const register = async (req: Request, res: Response) => {
  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hasPassword = await bcrypt.hash(req.body.password, salt)

  // Check if user already exist
  try {
    const foundUser = await User.findOne({ email: req.body.email })

    if (foundUser) {
      return res
        .status(409)
        .send({ message: 'User with this email already exists' })
    }

    let user = new User({
      ...req.body,
      password: hasPassword,
      user_type_id: 0,
    })

    const registeredUser = await user.save()
    let payload = {
      id: registeredUser._id,
      user_type_id: 0,
    }

    if (!config.TOKEN_SECRET)
      return res.status(400).send('No token secret specified')

    const token = jwt.sign(payload, config.TOKEN_SECRET)

    res.status(200).send({ token })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (user && user.password) {
      const validPass = await bcrypt.compare(req.body.password, user.password)
      if (!validPass)
        return res.status(401).send('Mobile/Email or Password is wrong')

      if (!config.TOKEN_SECRET)
        return res.status(400).send('No token secret specified')
      let payload = { id: user._id, user_type_id: user.user_type_id || 0 }
      const token = jwt.sign(payload, config.TOKEN_SECRET)

      res.status(200).header('auth-token', token).send({ token: token })
    } else {
      res.status(401).send('Invalid mobile')
    }
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}
