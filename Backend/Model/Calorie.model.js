import mongoose from "mongoose";

const MealSchema = mongoose.Schema({
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Date: { type: Date, default: Date.now },
    Meals: [{
        name: String,
        calories: Number,
        protein:Number
    }]
})

export const MealModel = mongoose.model("Meal",MealSchema);
