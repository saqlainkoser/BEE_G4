const mongoose =require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

//USER SCHEMA
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'Please enter your name.']
    },
    email:{
        type :String,
        required:[true,'Please enter an email.'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail , "Please enter a valid email."]
    },
    photo:String,
    password: {
        type:String,
        required:[true,'Please enter a password'],
        minlength:8
    },
    confirmPassword:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            validator :function(val){
                return val == this.password
            },
            message : "Password $ Confirm Password does not match!"
        }
    }
})

//PRE MIDDILEWARE
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    //encrypt the password before saving it
    this.password=await bcrypt.hash(this.password,16) 
    this .confirmPassword = undefined ;
    next();
})

//USER MODEL

const User = mongoose.model('User',userSchema)
module.exports = User;