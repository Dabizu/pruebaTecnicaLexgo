const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    idDepartamento:Number,
    nombre: String
});
module.exports=mongoose.model("Empleado",Schema)