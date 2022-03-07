import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: String, 
    content: String,
    image: String,
    date: { type: Date, default: Date.now }
});


export default new mongoose.model('blogsModel', blogSchema);