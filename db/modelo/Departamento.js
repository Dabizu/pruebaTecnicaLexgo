const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    idEmpresa:Number,
    id:Number,
    nombre: String
});
module.exports=mongoose.model("Departamento",Schema)