import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

let Estate = new Schema({
  id: { type: Number },
  type: { type: String },
  name: { type: String },
  city: { type: String },
  municipality: { type: String },
  location: { type: String },
  street: { type: String },
  area: { type: Number },
  rooms: { type: Number },
  constructionYear: { type: Number },
  state: { type: String },
  heating: { type: String },
  floor: { type: Number },
  totalFloors: { type: Number },
  parking: { type: String },
  monthly: { type: Number },
  price: { type: Number },
  about: { type: String },
  characteristics: [{ type: String }],
  busses: [{ type: Number }],
  agencyName: { type: String },
  agencyPIB: { type: String },
  agencyCity: { type: String },
  agencyAddress: { type: String },
  agencyPhone: { type: String },
  adFirstName: { type: String },
  adSurname: { type: String },
  adPhone: { type: String },
  adLicense: { type: String },
  sold: { type: Number },
  lastModified: { type: String },
  images: [{ type: String }],
  lat: { type: Number },
  lng: { type: Number },
});

export default mongoose.model("Estate", Estate, "estates");
