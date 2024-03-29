import mongoose, { Schema } from 'mongoose'
import mongooseAggregatePaginate from 'mongooseAggregatePaginate '


const commentschema = new Schema({
    content: {
        type: String,
        required: true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    }, 
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    } 
},
    { 
        timestamps: true 
    }

)

commentschema.plugin(mongooseAggregatePaginate)
export const comment = mongoose.model("comment", commentschema)  