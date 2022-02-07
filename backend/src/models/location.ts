import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Location = new Schema({
    city: {
        type: String
    },
    municipality: {
        type: String
    },
    location: {
        type: String
    },
    streets:[{
        type: String
    }]
})

export default mongoose.model('Location', Location, 'locationes');
