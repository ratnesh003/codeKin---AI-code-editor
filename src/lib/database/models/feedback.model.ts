import { Schema, model, models } from "mongoose";

const FeedbackSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email address",
        ],
    },
    content: {
        type: String,
        default: ""
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    username: { 
        type: String, 
        required: true 
    },
}, {
    timestamps: true
})

const Feedback = models?.Feedback || model("Feedback", FeedbackSchema);

export default Feedback;