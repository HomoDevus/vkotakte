import User from '../models/user'
import { Request, Response } from 'express'
import { decodeJWT } from '../helpers'
import { mapUserResponse, mapUserUpdate } from '../mappers'
import { RequestWithJwt } from "../types";

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })

    if (user) {

      res.json(user)
    } else {
      res.status(404).send('User not found')
    }
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    let token = req.headers.authorization as string

    const tokenData = decodeJWT(token)

    let user = await User.findOne({ _id: tokenData.id })

    if (user == null)
      return res.status(404).send('User with given id not found')

    const updatedUser = await Object.assign(
      user,
      mapUserUpdate(req.body),
    ).save()

    res.json(mapUserResponse(updatedUser))
  } catch (err) {
    res.sendStatus(500)
  }
}

export const getUsersList = async (req: Request, res: Response) => {
  try {
    const users = await User.find()

    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500)
  }
}

export const addFriend = async (req: RequestWithJwt, res: Response) => {
  try {
    const requestedUser = await User.findOne({_id: req.user.id})
    const userToAdd = await User.findOne({_id: req.body.userId})

    if (!requestedUser || !userToAdd) return res.status(400).send({message: 'User is not found'})

    requestedUser.friends.push(req.body.userId)
    userToAdd.friends.push(req.user.id)
    const savedUser = await requestedUser.save()
    await userToAdd.save()

    res.json(savedUser)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

export const removeFriend = async (req: RequestWithJwt, res: Response) => {
  try {
    const userWhoRequested = await User.findOne({_id: req.user.id})
    const userToRemove = await User.findOne({_id: req.body.userId})

    if (!userWhoRequested || !userToRemove) return res.status(400).send({message: 'User is not found'})

    userWhoRequested.friends = userWhoRequested.friends.filter(friendId => friendId !== req.body.userId)
    userToRemove.friends = userToRemove.friends.filter(friendId => friendId !== req.user.id)
    const savedUser = await userWhoRequested.save()
    await userToRemove.save()

    res.json(savedUser)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}