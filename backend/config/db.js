import mongoose from "mongoose"

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://greatstack:33858627@cluster0.mrkth.mongodb.net/food-app-dinesh').then(()=>console.log("DB Connected"));
}