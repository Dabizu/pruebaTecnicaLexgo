const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const config = require("../config");
const url = "mongodb+srv://rootdavid:" + config.PASSWORD + "@clusterazure.l92gg.mongodb.net/" + config.DATABASE + "?retryWrites=true&w=majority";
mongoose.connect(url)
  .then(() => console.log('Connected!'));
//var autoIncrement = require('mongoose-auto-increment');

//autoIncrement.initialize(connection);

router.post("/insertarEmpresa", (req, res) => {
  var nombre = req.param("nombre");
  /*
  const Schema = mongoose.Schema;
  //const ObjectId=Schema.ObjectId;
  const Empresa=new Schema({
    id: {type:Number, default: 0},
    nombre: String
  });
  
  const ModeloEmpresa=mongoose.model("Empresa",Empresa);*/
  const ModeloEmpresa = require("./modelo/Empresa");
  ModeloEmpresa.find()
    .then(respuesta => {
      console.log(respuesta)
      const modeloEmpresa = new ModeloEmpresa({ nombre: nombre, id: respuesta.length });
      modeloEmpresa.save()
        .then(respuesta => {
          console.log(respuesta)
          res.send("1");
        })
        .catch(err => {
          console.error(err)
          res.send("0");
        })

    })
    .catch(err => {
      console.error(err)
    })
});

router.get("/mostrarEmpresa", (req, res) => {
  const ModeloEmpresa = require("./modelo/Empresa");
  ModeloEmpresa.find()
    .then(respuesta => {
      console.log(respuesta)
      res.json(respuesta)
    })
    .catch(err => {
      console.error(err)
    })
});


/*
router.delete("/eliminarEmpresa",(req,res)=>{
  var nombre=req.param("nombre");
  const ModeloEmpresa = require("./modelo/Empresa");

});*/

router.post("/insertarDepartamento", (req, res) => {
  var nombreEmpresa = req.param("nombreEmpresa")
  var nombre = req.param("nombre");
  //var id = req.param("id");
  const ModeloEmpresa = require("./modelo/Empresa");
  ModeloEmpresa
    .find({
      nombre: nombreEmpresa
    })
    .then(respuesta => {
      console.log(respuesta[0].id)
      //res.send(respuesta)

      const ModeloDepartamento = require("./modelo/Departamento");
      //res.send(respuesta)
      ModeloDepartamento.find({})
        .then(respuestaAutoincrementable => {
          console.log(respuestaAutoincrementable.length)
          const modeloDepartamento = new ModeloDepartamento({ nombre: nombre, idEmpresa: respuesta[0].id, id: respuestaAutoincrementable.length });
          modeloDepartamento.save()
            .then(respuesta => {
              console.log(respuesta)
              res.send("1");
            })
            .catch(err => {
              console.error(err)
              res.send("0");
            })
          //res.json(respuestaAutoincrementable)
        })
        .catch(err => {
          console.error(err)
        })

      /*
      const modeloEmpresa = new ModeloEmpresa({ nombre: nombre, id: respuesta.length });
      modeloEmpresa.save()
        .then(respuesta => {
          console.log(respuesta)
          res.send("1");
        })
        .catch(err => {
          console.error(err)
          res.send("0");
        })*/

    })
    .catch(err => {
      console.error(err)
    })


  //res.send("guardado");
})

router.get("/mostrarDepartamento", (req, res) => {
  var id = req.param("id");
  const ModeloDepartamento = require("./modelo/Departamento");
  ModeloDepartamento.find({ idEmpresa: id })
    .then(respuesta => {
      console.log(respuesta)
      res.json(respuesta)
    })
    .catch(err => {
      console.error(err)
    })
});

router.post("/insertarLider", (req, res) => {
  var nombre=req.param("nombre");
  const ModeloDepartamento = require("./modelo/Departamento");
  ModeloDepartamento
    .find({
      nombre: nombreDepartamento
    })
    .then(respuesta => {
      console.log(respuesta[0].id)
      //res.send(respuesta)

      const ModeloLider = require("./modelo/Lider");
      const modeloLider = new ModeloLider({ nombre: nombre, idDepartamento: respuesta[0].id });
      modeloLider.save()
        .then(respuesta => {
          console.log(respuesta)
          res.send("1");
        })
        .catch(err => {
          console.error(err)
          res.send("0");
        })


      /*
      const modeloEmpresa = new ModeloEmpresa({ nombre: nombre, id: respuesta.length });
      modeloEmpresa.save()
        .then(respuesta => {
          console.log(respuesta)
          res.send("1");
        })
        .catch(err => {
          console.error(err)
          res.send("0");
        })*/

    })
    .catch(err => {
      console.error(err)
    })
})


module.exports = router;