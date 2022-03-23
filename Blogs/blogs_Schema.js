import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    author:String,
    title: String, 
    content: String,
    image: { data: Buffer, contentType: String},
    date: { type: Date, default: Date.now },
    comments:[Object]

});


export default new mongoose.model('blogsModel', blogSchema);