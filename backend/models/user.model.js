import mongoose,{Schema} from 'mongoose';

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    usn:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum :["user","club","organization"],
        required:true
    },
    description:{
        type:String
    }
}
,{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;