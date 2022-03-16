import usersModel from '../users_Schema.js'

const users = usersModel.find();
// console.log(users)
const signupValidator = async(req, res, next) => {
    const users= await usersModel.find();
    // console.log(users);

    //validating user emails
    let {email, firstname} = req.body
    if(!email) return res.json({error: 'email missing'});
    if(!firstname) return res.json({error: 'name missing'});
    const repeatedUser=await users.find((u) => u.email === email)
    if(repeatedUser) return res.json(
      {
      message: `user with email ${email} exists`,
      // user: repeatedUser
  })
    next();
  }
  
  export {signupValidator as default}