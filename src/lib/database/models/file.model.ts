import { Schema, model, models } from "mongoose";

const FileSchema = new Schema({
    filename: {
        type: String,
        required: true,
    },
    languageType: {
        type: String,
        required: true,
    },
    content: { 
        type: String, 
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    collectionId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Collection', 
        default: null 
    },
}, {
    timestamps: true
})

const File = models?.File || model("File", FileSchema);

export default File;