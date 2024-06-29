import mongoose from "mongoose";

const MealSchema = mongoose.Schema({
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,
        required:true
    },
    Date: { type: String},
    Meals: [{
        name: String,
        calories: Number,
        protein:Number
    }]
})

export const MealModel = mongoose.model("Meal",MealSchema);
