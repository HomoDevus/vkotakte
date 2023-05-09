import mongoose, { Types } from 'mongoose'

const Schema = mongoose.Schema

const publicationSchema = new Schema({
  userId: Types.ObjectId,
  title: String,
  description: String,
  image: Types.ObjectId,
  likes: Number,
}, {timestamps: true})

export default mongoose.model('publication', publicationSchema, 'publications')