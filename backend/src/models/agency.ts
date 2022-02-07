import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Agency = new Schema({
    name: {
        type: String
    },
    pib: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    }
})

export default mongoose.model('Agency', Agency, 'agencies');