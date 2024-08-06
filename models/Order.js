import { Schema, model, models } from "mongoose";


const ModelSchema = new Schema({
    line_items:{
        type:Object
    },
    name:String,
    city:String,
    email:String,
    code:String,
    street_address:String,
    country:String,
    state:String,
    paid:Boolean

})

const Order = models.Order || model("order",ModelSchema)
export default Order