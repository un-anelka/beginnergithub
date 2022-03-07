import blogsModel from "../blogs_Schema.js";

const blogPost= async(req, res) => {
    try {
        const blogs = await blogsModel.create({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            date: Date.now()
        })
        res.status(201).json({
            message: "blog has been created successfully",
            data: blogs
        })
    } catch (error) {
        console.log(error)
    }; 
}
const blogGetAll= async(req, res) => {
    try {
        const blogs = await blogsModel.find().sort({
            date:"-1"
        });
        
        res.status(200).json({
            message: "Todos are fetched successfully",
            data: blogs
        })
        
    } catch (error) {
        console.log(error)
    };
}
const blogGetOne= async(req, res) => {
    try {
        const id=req.params.id;
        const blogId = await blogsModel.findById(id)
        
        res.status(200).json({
            message: `blog with the ID:${id} is fetched successfully`,
            data:  blogId
        })
    } catch (error) {
        console.log(error)
    };
}
const blogUpdate= async(req, res) => {
    try {
        const id=req.params.id;
        // const blogId = await blogsModel.findByIdAndUpdate(id);
        // // const blogupdate= req.body
        
        const blogupdate = await blogsModel.findByIdAndUpdate(id,{
            ...req.body
        })
        // Object.assign(blogId, blogupdate)

        res.status(200).json({
            message: `blog with the ID:${id} is updated successfully`,
            data: blogupdate
        })
    } catch (error) {
        console.log(error)
    };
}
const blogDelete= async(req, res) => {
    try {
        const id=req.params.id;
        const blogId = await blogsModel.findByIdAndDelete(id)
        
        res.status(200).json({
            message: `blog with the ID:${id} was deleted successfully`,
            // data: blogId
        })
    } catch (error) {
        console.log(error)
    };
}



export {blogPost, blogGetAll, blogUpdate, blogDelete, blogGetOne} 
