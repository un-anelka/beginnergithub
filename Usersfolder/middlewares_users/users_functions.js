import bcrypt from "bcrypt"
import usersModel from "../users_Schema.js";
import jwt from "jsonwebtoken";




const userPost= async(req, res) => {
    try {
        let salt= await bcrypt.genSalt();
        let hashedPassword= await bcrypt.hash(req.body.password, salt);
        
        let ROLE="";
        const user= await usersModel.find();
        if (!user || user.length===0) {
            ROLE="admin";
        }
            else{
                ROLE="normal";
                // res.json(ROLE);
            }
        // console.log(ROLE)

            
        const users = await usersModel.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
            role: ROLE,
            date: Date.now()
        })
        // console.log(req.body)

        res.status(201).json({
            message: "User has been created successfully",
            // data: users.exclude("password")
            data: {
                _id: users._id,
                firstname: users.firstname,
                lastname: users.lastname,
                email: users.email,
                email: users.email,
                email: users.email,
                role: users.role,
                date: users.date
            }

        })
    } catch (error) {
        console.log(error)
    }; 
}
const userGetAll= async(req, res) => {
    try {
        const users = await usersModel.find().sort({
            date:"-1"
        });
        
        res.status(200).json(
        {
            message: "Todos are fetched successfully",
            users
        }
        )
        
    } catch (error) {
        console.log(error)
    };
}
const userGetOne= async(req, res) => {
    try {
        const id=req.params.id;
        const userId = await usersModel.findById(id)
        if (!userId) return res.status(404).json({ERROR: "Oops! The user is not found"})
        return res.status(200).json({
            message: `User with the ID:${id} is fetched successfully`,
            userId:  {
                _id: userId.id,
                firstname: userId.firstname,
                lastname: userId.lastname,
                email: userId.email,
                email: userId.email,
                email: userId.email,
                role: userId.role,
                date: userId.date
            
            }
        })
    } catch (error) {
        console.log(error)
    };
}
const userUpdate= async(req, res) => {
    try {
        const id=req.params.id;
        const userId = await usersModel.findByIdAndUpdate(id);
        // const userupdate= req.body
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
        
        const userupdate = await usersModel.findByIdAndUpdate(id,{
            ...req.body
        })
        // Object.assign(userId, userupdate)

        res.status(200).json({
            message: `User with the ID:${id} is updated successfully`,
            // data: userId
        })
    } catch (error) {
        console.log(error)
    };
}
const userDelete= async(req, res) => {
    try {
        const id=req.params.id;
        const userId = await usersModel.findByIdAndDelete(id);
        if (!userId) {
            return res.json({message: "The user that you are trying to delete does not exist!"})
        }
        
        
        res.status(200).json({
            message: `User with the ID:${id} was deleted successfully`,
            // data: userId
        })
    } catch (error) {
        console.log(error)
    };
}

const userlogin=  async (req, res, next) => {
    const users= await usersModel.find().sort({date: "-1"})
    const user = await users.filter(user => user.firstname === req.body.firstname);
    if (!user[0]) return res.status(400).send("cannot find user");
    else {
        try {
            if(await bcrypt.compare(req.body.password, user[0].password)){
                const tokenUser=user[0];
                // jwt.sign({tokenUser}, "secretkey",{expiresIn: "40s"}, (err, token)=>
                jwt.sign({tokenUser}, "secretkey", (err, token)=>
                {
                    if (err) throw err;
                    res.json({
                        message: `Token generated and Welcome ${user[0].email}`,
                        token
                    })
                })
                
            } 
            else{res.send("Not allowed"); 
            }
            // res.send(user[0].password); 
            // console.log(user[0].password)
    
            
    
        } catch (error) {
            console.log(error)
        };
    
    }
     next();
    }


  

    const verifyToken = (req,res,next)=>{
        const authHeader=req.headers["authorization"];
        const token= authHeader && authHeader.split(" ")[1];
        if (token==null) return res.sendStatus (401);
    
        jwt.verify(token, "secretkey",(err,user)=>{
            if (err) return res.sendStatus(403);
            req.user=user;
            // console.log(req.user)

            next();
        })
        
    }

    const userRole= async(req, res, next)=>{
        // 
        // res.send(req.user)
        // console.log(req.user)
        if (req.user.tokenUser.role !== "admin") {
            res.json({
                message: "Oops! You need to login as admin"
            })
        } else{
            next()
        };
    }
    
    
    const duplicate= async(req, res, next)=>{
         const users = await usersModel.find();
        users.filter(user=> user.firstname === req.body.firstname);
        if (users[0]){
            return res.status(400).json({
                message: "The user exist"
            })
        } else{
            next();
        }
    }
   
   
  


export {userPost, userGetAll, userUpdate, userDelete, userGetOne, userlogin, verifyToken, userRole, duplicate} 
