import mongoose,{Schema} from 'mongoose'

const userschema = new schema(
    {
username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
},
fullname:{
    type:String,
    required:true,
    lowercase:true,
    trim:true,
    index:true
},
avatar:{
    type:String,   //cloudinary url
    required:true,
},
coverimage:{
    type:String,   //cloudinary url
},
watchhistory:[
{
    type:Schema.Types.ObjectId,
    ref:"Video"
}
],
password:{
    type:string,
    required: [true, 'Password is required']
},
refreshtoken:{
    type:String
}
},
{
    timestamps:true
}

)








export const User = mongoose.model("User",userschema)
