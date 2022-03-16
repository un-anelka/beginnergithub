import usersModel from "../../Usersfolder/users_Schema.js";
import blogsModel from "../../Blogs/blogs_Schema.js";




const commentPost= async(req, res) => {
    try {
        const id = req.params.id
        const blogs = await blogsModel.findOneAndUpdate({_id:id},{
        // const blogs = await blogsModel.findById(id)
        // blogs({
          $addToSet:{
            comments: {
                username:"UN RUDASINGWA",
                data: req.body,
                date: Date.now()
            }
          }
        })
       
        res.send(blogs)
        // res.status(201).json({
        //     message: "comment has been created successfully",
        // })
    } catch (error) {
        console.log(error)
    }; 
}


export {commentPost as default}