const mongoose = require('mongoose')

const Connection = async ()=>{
    const url = "mongodb://localhost:27017/todo"

    try{
        await mongoose.connect(url,{useNewUrlParser : true})
        console.log("Database Connected")
    }catch(err){
        console.log("Error connecting to Database")
    }
}

module.exports = Connection