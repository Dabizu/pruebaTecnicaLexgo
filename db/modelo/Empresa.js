const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    id:Number,
    nombre: String
});
//const ObjectId=Schema.ObjectId;
//const Empresa=new Schema();
module.exports=mongoose.model("Empresa",Schema)