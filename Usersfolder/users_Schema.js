import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: String, 
    lastname: String,
    email: String,
    password: { type: String, select: false },
    role:String,
    // comment: Array,
    date: { type: Date, default: Date.now }
});


export default new mongoose.model('usersModel', userSchema);