import mongoose from 'mongoose';

const FoodSchema = mongoose.Schema(
    {


        foodname: {
            type: String,
            required: true
        },
        foodtype: {
            type: String,
            required: true
        },
        foodimage: {
            type: String,
            required: true
        },
        foodprice: {
            type: Number,
            required: true
        },

    },
    {
        timestamps: true

    }
)

export const FOODDETAILS = mongoose.model("FoodItems", FoodSchema);