import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema(
  {
    data: Buffer,
    contentType: String,
    size: Number,
    encoding: String,
    name: String,
  },
  { timestamps: true },
)

export const ImageModel = mongoose.model('images', imageSchema)
