
const CustomError = require('../CustomError.js');
const User = require('./../Models/userModel.js')
const jwt=require('jsonwebtoken');

const signToken = id => {
    return jwt.sign(
        {id:id},
        process.env.SECRET_STR,
       {expiresIn:process.env.LOGIN_EXPIRES}
    );
}


exports.signup = async (req,res,next) =>{
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(201).json({
        status:"success",
        token,
        data:{
            user:newUser
        }
    })
}


exports.login = async(req,res,next) =>{
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        const error = new CustomError('Please provide email ID & Password for login !',400);
        //by using next , all middleware stacks will skip and it will call global error middleware
        return next(error)
    }

    
    //Check if user exists with given email
    const user = await User.findOne({email}).select("+password")

    //to compare user given password and DB password
    //we will make a method on schema

    const isMatch = await user.comparePasswordInDb(password,user.password)
    console.log(isMatch);

    const token = signToken(user._id);

    res.status(200).json({
        status:'success',
        token,
        user
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