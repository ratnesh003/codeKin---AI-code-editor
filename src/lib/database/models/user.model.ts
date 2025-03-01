import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        reqired: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email address",
        ],
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4
    },
    password: {
        type: String,
        required: true,
    },
    userFiles: {
        type: [Schema.Types.ObjectId],
        ref: "File",
        default: []
    },
    userCollections: {
        type: [Schema.Types.ObjectId],
        ref: "Collection",
        default: []
    },
    userFeedbacks: {
        type: [Schema.Types.ObjectId],
        ref: "Feedback",
        default: []
    }
}, {
    timestamps: true
})

const User = models?.User || model("User", UserSchema);

export default User;