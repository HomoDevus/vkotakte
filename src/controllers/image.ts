import { Request, Response } from 'express'
import path from 'path'
import { ImageModel } from '../models/image'

export const uploadImage = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { image } = req.files

    if (!image) return res.sendStatus(400)
    if (!/^image/.test(image.mimetype)) return res.sendStatus(400)

    image.mv(path.resolve(`./upload/${image.name}`))
    image.contentType = image.mimetype
    const imageData = new ImageModel(image)
    const savedImage = await imageData.save()
    res.send(savedImage)
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
}

export async function getAvatar(req: Request, res: Response) {
  try {
    const { imageId: _id } = req.params
    const image = await ImageModel.findOne({ _id }).lean().exec()
    res.json(image);
  } catch (err) {
    res.sendStatus(500)
  }
}
