
const User = require('./../Models/userModel.js')
const jwt=require('jsonwebtoken');

exports.signup = async (req,res,next) =>{
    const newUser = await User.create(req.body);

    const token = jwt.sign(
        {id:newUser._id},
        process.env.SECRET_STR,
       {expiresIn:process.env.LOGIN_EXPIRES}
    )

    res.status(201).json({
        status:"success",
        token,
        data:{
            user:newUser
        }
    })
}

//update user 
exports.updateUser = async(req,res) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(201).json({
            status:"success",
            data:{
                user:updatedUser
            }
        })

    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
}





//get user by id



//delete user 