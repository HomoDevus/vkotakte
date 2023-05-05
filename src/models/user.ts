import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    user_type_id: Number,
    age: Number,
    city: String,
    publications: [String],
    friends: [String],
    avatar: Buffer
});

export default mongoose.model('user', userSchema, 'users');
