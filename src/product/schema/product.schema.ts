import {Schema} from 'mongoose';


export const  productSchema = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    imageUrl:{
        type:String
    },
    price:{
        type:Number
    },
    createdAt:{
        type:Date ,default:Date.now()
    }
},{
    timestamps:true
})