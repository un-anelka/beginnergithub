
const commentValidator = async(req, res, next) => {
    
    if(req.body==null) return res.json({error: 'You cannot send empty comments'});
    next();
  }


  export {commentValidator as default}