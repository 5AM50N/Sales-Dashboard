import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    category:
    {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    sold:{
        type: Boolean,
        default: false
    },
    dateOfSale:{
        type: Date
    }
});

export default mongoose.model("Product",productSchema);