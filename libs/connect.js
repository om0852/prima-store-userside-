
const { default: mongoose } = require("mongoose")
const { default: client } = require("./mongoose")

export const connectToDB = async()=>{

    const url = process.env.MONGODB_URI
    if(mongoose.connection.readyState===1){
        return mongoose.connection.asPromise();
    }
    else{
        mongoose.connect(url);
    }
}
