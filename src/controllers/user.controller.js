import { asynchandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/apierror.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Apiresponse } from "../utils/apiresponse.js";



const registerUser= asynchandler(async (req,res)=>{
//get user details from frontend
//validation - not empty
//check if user already exist :username,email
//check for image,avatar
//upload on cloudinary
//create user object - create entry in db
//remove password and refresh tokenfield from response
//check for user creation 
//return res
const{fullname , email , username , password} = req.body
console.log("email:",email);

if ([fullname,email,username,password].some((field)=>field?.trim() ==="")){
throw new Apierror(400,"All fields are required")
}

 const existeduser = await User.findOne({
    $or: [
        {username}, {email}
    ]
})

if(existeduser)
{throw new Apierror(409,"User with Email or Username already exist")}

const avatarlocalpath = req.files?.avatar[0]?.path
const coverImagelocalpath = req.files?.coverImage[0]?.path
console.log("Avatar file received:", req.files?.avatar);
if(!avatarlocalpath){
    throw new Apierror(400,"Avatar file is required")
}
const avatar = await uploadOnCloudinary(avatarlocalpath)
const coverImage = await uploadOnCloudinary(coverImagelocalpath)

if(!avatar){
    throw new Apierror(400,"Avatar file not uploaded")
}
const user= await User.create({
    fullname,
    avatar: avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username: username.toLowerCase()
})
 const createdUser= await User.findById(user._id).select(
    "-password -refreshtoken")

    if(!createdUser){
        throw new Apierror(500,"something went wrong while registering a user")
    }

    return res.status(201).json(
        new Apiresponse(200,createdUser, "User Registered sucesfully")
    )
})






export {registerUser}
