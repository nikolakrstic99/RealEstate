import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Municipality = new Schema({
    city: {
        type: String
    },
    municipality:{
        type: String
    }
})

export default mongoose.model('Municipality', Municipality, 'municipalities');
