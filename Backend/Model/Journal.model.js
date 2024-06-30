import mongoose from "mongoose";

const JournalSchema = mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Day:{
        type:String
    },
    Date:{
        type:String
    }
})

export const JournalModel = mongoose.model("Journal", JournalSchema)