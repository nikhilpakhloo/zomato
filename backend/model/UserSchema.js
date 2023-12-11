import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: Number
            , unique: true
        }
    },
    {
        timestamps: true
    }
)
export const USERDETAILS = mongoose.model("Userdata", UserSchema)