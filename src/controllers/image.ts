// import { Request, Response } from "express";
// import mongoose from "mongoose";
//
// export async function uploadFile(req: Request, res: Response) {
//   console.log(req.file)
//   // @ts-ignore
//   const image = { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype }
//   const savedImage = await ImageModel.create(image);
//   res.send(savedImage);
// }
//
// export async function getFile(req: Request, res: Response) {
//   const { id: _id } = req.params;
//   // If you dont use lean(), you wont decode image as base64
//   const image = await ImageModel.findOne({ _id }).lean().exec();
//   res.send(image);
// }