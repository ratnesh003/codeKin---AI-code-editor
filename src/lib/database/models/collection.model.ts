import { Schema, model, models } from "mongoose";

const CollectionSchema = new Schema({
    collectionName: {
        type: String,
        required: true,
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
    parentId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Collection', 
        default: null 
    },
    filesId: {
        type: [Schema.Types.ObjectId],
        ref: "File",
        default: []
    },
    collectionsId: {
        type: [Schema.Types.ObjectId],
        ref: "Collection"
    }
}, {
    timestamps: true
})

const Collection = models?.Collection || model("Collection", CollectionSchema);

export default Collection;