import blogsModel from "../blogs_Schema.js";
import * as fs from "fs";
import formidable from "formidable";

const blogPost = async (req, res) => {

    try {

        const blogs = await blogsModel.create({
            author: "UN",
            title: req.body.title,
            image: req.body.image,
            content: req.body.content,

            date: Date.now()


        })
        res.status(201).json({
            message: "blog has been created successfully",
            data: blogs
        })
    } catch (error) {
        console.log(error)
    };

};

const blogGetAll = async (req, res) => {
    try {
        const blogs = await blogsModel.find().sort({
            date: "-1"
        });

        res.status(200).json({
            message: "Todos are fetched successfully",
            data: blogs
        })

    } catch (error) {
        console.log(error)
    };
}
const blogGetOne = async (req, res) => {
    try {
        const id = req.params.id;
        const blogId = await blogsModel.findById(id)
        if (!blogId) return res.json({ message: `Blog is with this id ${id} unavailable!` })
        res.status(200).json({
            message: `blog with the ID:${id} is fetched successfully`,
            data: blogId
        })
    } catch (error) {
        console.log(error)
    };
}
const blogUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        // const blogId = await blogsModel.findByIdAndUpdate(id);
        // // const blogupdate= req.body

        const blogupdate = await blogsModel.findByIdAndUpdate(id, {
            ...req.body
        })
        // Object.assign(blogId, blogupdate)

        res.status(200).json({
            message: `blog with the ID:${id} is updated successfully`,
            // data: blogupdate
        })
    } catch (error) {
        console.log(error)
    };
}
const blogDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const blogId = await blogsModel.findByIdAndDelete(id);
        if (!blogId) {
            return res.json({ message: "The blog you are trying to delete does not exist." })
        }

        res.status(200).json({
            message: `blog with the ID:${id} was deleted successfully`,
            // data: blogId
        })
    } catch (error) {
        console.log(error)
    };
}

const blogDuplicate = async (req, res, next) => {
    const blogs = await blogsModel.find();
    blogs.filter(blog => blog.title === req.body.title);
    if (blogs[0]) {
        return res.status(400).json({
            message: "The blog exist"
        })
    } else {
        next();
    }
}

// const image = (req, res) => {
//     const form = formidable({ multiples: true });

//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             next(err);
//             return;
//         }
//         //   console.log(req.profile)
//         res.json({ fields, files });

//     });
//     // const form = new formidable.IncomingForm();
//     // form.keepExtensions = true;
//     // form.parse(req, (err, fields, files) => {
//     //     console.log("Parsing done.");
//     //     // console.dir(req.headers);
//     //     // console.log(fields);
//     //     // console.log(files);

//     // })
// };


// const createImage = (req, res) => {
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//         // console.log("Parsing done.");
//         // console.dir(req.headers);
//         console.log(fields);
//         // console.log(files);
//         console.log(files.image);
//         if (err) {
//             return res.status(400).json({
//                 error: "Image could not be uploaded",
//             });
//         }
//         // check for all fields
//         const { title, content } = fields;
//         if (!title && !content) {
//             return res.status(400).json({
//                 error: " All fields are required",
//             });
//         }
//         if (!title) {
//             return res.status(400).json({
//                 error: `Title is required`,
//             });
//         }
//         if (!content) {
//             return res.status(400).json({
//                 error: `Content is required`,
//             });
//         }
//         let blog = new blogsModel(fields);
//         blog.createdBy = req.profile;
//         if (files.image) {
//             //validation of image files
//             if (files.image.size > 3000000) {
//                 return res.status(400).json({
//                     error: "Image should be less than  3mb in size",
//                 });
//             }
//             blog.image.data = fs.readFileSync(files.image.filepath);
//             // console.log(`data: ${blog.image.data}`);
//             blog.image.contentType = files.image.mimetype;
//             console.log(blog.image.contentType)
//         }
//         blog.save((err, result) => {
//             result.image = undefined;
//             if (err) {
//                 console.log(err);
//                 return res.status(404).json({
//                     // error: errorHandler(err),
//                     error: err.message,
//                     status: false,
//                 });
//             }
//             res.json({
//                 blog: result,
//                 status: true,
//                 message: "Your blog is created successful",
//             });
//         });
//     });
// };






export { blogPost, blogGetAll, blogUpdate, blogDelete, blogGetOne, blogDuplicate }
// export { blogGetAll, blogUpdate, blogDelete, blogGetOne, blogDuplicate, createImage, image } 
