import { Response } from 'express'
import Publication from '../models/publications'
import { RequestWithJwt } from '../types'
import User from '../models/user'

export const addPublication = async (req: RequestWithJwt, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user.id })

    if (!user) return res.status(400).send({ message: 'User was not found' })

    const publication = new Publication({
      ...req.body,
      userId: req.user.id,
    })
    const publishedPublication = await publication.save()

    res.json(publishedPublication)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

export const getUserPublications = async (
  req: RequestWithJwt,
  res: Response,
) => {
  try {
    const publications = await Publication.find({ userId: req.params.userId })

    res.json(publications)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

export const getFeed = async (req: RequestWithJwt, res: Response) => {
  try {
    const userWhoRequested = await User.findOne({ _id: req.user.id })
    if (!userWhoRequested)
      return res.send(400).send({ message: 'User is not found' })
    const publications = await Publication.find({
      userId: userWhoRequested.friends,
    })

    res.json(publications)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

export const likePublication = async (req: RequestWithJwt, res: Response) => {
  try {
    const publication = await Publication.findOne({
      _id: req.body.publicationId,
    })
    if (!publication)
      return res.status(400).send({ message: 'Publication is not found' })

    if (!publication.likes) {
      publication.likes = []
    }

    if (req.body.like) {
      if (publication.likes.includes(req.user.id)) {
        return res.status(400).send({ message: 'Publication already liked' })
      }
      publication.likes.push(req.user.id)
    } else {
      publication.likes = publication.likes.filter(
        userId => userId.toString() !== req.user.id,
      )
    }
    await publication.save()

    res.json({ status: 'success' })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}
