import { Request, Response } from 'express'
import path from 'path'
import { ImageModel } from '../models/image'

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { avatar } = req.files

    if (!avatar) return res.sendStatus(400)
    if (!/^image/.test(avatar.mimetype)) return res.sendStatus(400)

    avatar.mv(path.resolve(`./upload/${avatar.name}`))
    avatar.contentType = avatar.mimetype
    const imageData = new ImageModel(avatar)
    const savedImage = await imageData.save()
    res.send(savedImage)
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
}

export async function getAvatar(req: Request, res: Response) {
  try {
    const { avatarId: _id } = req.params
    const image = await ImageModel.findOne({ _id }).lean().exec()
    res.json(image);
  } catch (err) {
    res.sendStatus(500)
  }
}
