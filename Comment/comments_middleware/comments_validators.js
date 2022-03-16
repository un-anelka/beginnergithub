import blogsModel from '../blogs_Schema.js'

const blogs = blogsModel.find();
// console.log(blogs)
const BlogValidator = async(req, res, next) => {
    const blogs= await blogsModel.find();
    // console.log(blogs);

    //validating blog emails
    let {title, content} = req.body
    if(!title) return res.json({error: 'title missing'});
    if(!content) return res.json({error: 'content missing'});
    const repeatedblog=await blogs.find((u) => u.title === title)
    if(repeatedblog) return res.json(
      {
      message: `blog with title ${title} exists`,
      // blog: repeatedblog
  })
    next();
  }


  export {BlogValidator as default}