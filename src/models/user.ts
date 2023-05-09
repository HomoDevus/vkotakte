import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  age: Number,
  city: String,
  avatar: Types.ObjectId,
  publications: [String],
  friends: [String],
  user_type_id: Number,
})

export default mongoose.model('user', userSchema, 'users')
