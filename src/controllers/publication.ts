import { Request, Response } from 'express'
import Publication from '../models/publications'

export const addPublication = async (req: Request, res: Response) => {
  try {
    const publication = new Publication({
      ...req.body,
      likes: 0
    })
    const publishedPublication = publication.save()

    res.json(publishedPublication)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

export const getUserPublications = async (req: Request, res: Response) => {
  try {
    const publications = await Publication.find({ userId: req.params.userId })

    res.json(publications)
  } catch (err) {
    console.error(err)
    res.status(500)
  }
}