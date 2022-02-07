import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Request = new Schema({
    firstname: {
        type: String
    },
    surname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    agency: {
        type: String
    },
    license: {
        type: String
    },
    birthday: {
        type: String
    },
    type: {
        type: Number
    },
    city: {
        type: String
    },
    imageFile:{
        type:String
    }
})

export default mongoose.model('Request', Request, 'requests');