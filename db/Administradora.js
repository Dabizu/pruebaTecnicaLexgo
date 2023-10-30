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

router.get("/buscarDepartamento", (req, res) => {
  var nombre = req.param("nombre");
  const ModeloEmpresa = require("./modelo/Empresa");
  ModeloEmpresa.find({ nombre: nombre })
    .then(respuesta => {
      console.log(respuesta)
      const ModeloDepartamento = require("./modelo/Departamento");
      ModeloDepartamento.find({ idEmpresa: respuesta[0].id })
        .then(respuesta2 => {
          console.log(respuesta2)
          res.json(respuesta2)
        })
        .catch(err => {
          console.error(err)
        })
    })
    .catch(err => {
      console.error(err)
    })
  var id = req.param("id");

});

router.get("/mostrarDepartamento", (req, res) => {
  const ModeloDepartamento = require("./modelo/Departamento");
  ModeloDepartamento.find({})
    .then(respuesta => {
      console.log(respuesta)
      res.json(respuesta)
    })
    .catch(err => {
      console.error(err)
    })
});

router.post("/insertarLider", (req, res) => {
  var nombre = req.param("nombre");
  var nombreDepartamento = req.param("nombreDepartamento")
  const ModeloDepartamento = require("./modelo/Departamento");
  ModeloDepartamento
    .find({
      nombre: nombreDepartamento
    })
    .then(respuesta => {
      //console.log(respuesta[0].id)
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
    })
    .catch(err => {
      console.error(err)
    })
});

router.get("/buscarLider", (req, res) => {
  var nombre = req.param("nombre");
  const ModeloDepartamento = require("./modelo/Departamento");
  ModeloDepartamento.find({ nombre: nombre })
    .then(respuesta => {
      console.log(respuesta)
      const ModeloLider = require("./modelo/Lider");
      ModeloLider.find({idDepartamento: respuesta[0].id})
        .then(respuestax => {
          console.log(respuestax)
          res.json(respuestax)
        })
        .catch(err => {
          console.error(err)
        });
    })
    .catch(err => {
      console.error(err)
    })
})

router.get("/buscarEmpleado", (req, res) => {
  var nombre = req.param("nombre");
  const ModeloDepartamento = require("./modelo/Departamento");
  ModeloDepartamento.find({ nombre: nombre })
    .then(respuesta => {
      console.log(respuesta)
      const ModeloEmpleado = require("./modelo/Empleado");
      ModeloEmpleado.find({idDepartamento: respuesta[0].id})
        .then(respuestax => {
          console.log(respuestax)
          res.json(respuestax)
        })
        .catch(err => {
          console.error(err)
        });
    })
    .catch(err => {
      console.error(err)
    })
})

router.post("/insertarEmpleado", (req, res) => {
  var nombre = req.param("nombre");
  var nombreDepartamento = req.param("nombreDepartamento");
  const ModeloDepartamento = require("./modelo/Departamento");
  ModeloDepartamento
    .find({
      nombre: nombreDepartamento
    })
    .then(respuesta => {
      const ModeloEmpleado = require("./modelo/Empleado");
      const modeloLider = new ModeloEmpleado({ nombre: nombre, idDepartamento: respuesta[0].id });
      modeloLider.save()
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

router.post("/eliminarLider", (req, res) => {
  var nombre = req.param("nombre");
  const ModeloLider = require("./modelo/Lider");
  ModeloLider.findOneAndRemove({
    nombre: nombre
  })
    .then(response => {
      console.log(response)
      res.send("1");
    })
    .catch(err => {
      console.error(err)
      res.send("0");
    })
});

router.post("/eliminarEmpleado", (req, res) => {
  var nombre = req.param("nombre");
  const ModeloEmpleado = require("./modelo/Empleado");
  ModeloEmpleado.findOneAndRemove({
    nombre: nombre
  })
    .then(response => {
      console.log(response)
      res.send("1");
    })
    .catch(err => {
      console.error(err)
      res.send("0");
    })
});

router.get("/mostrarLideres", (req, res) => {
  const ModeloLider = require("./modelo/Lider");
  ModeloLider.find()
    .then(respuesta => {
      console.log(respuesta)
      res.json(respuesta)
    })
    .catch(err => {
      console.error(err)
    })
});

router.get("/mostrarEmpleados", (req, res) => {
  const ModeloEmpleado = require("./modelo/Empleado");
  ModeloEmpleado.find()
    .then(respuesta => {
      console.log(respuesta)
      res.json(respuesta)
    })
    .catch(err => {
      console.error(err)
    })
});

router.post("/cambiarDepartamentoLider",(req,res)=>{
  var nombre=req.param("nombre");
  var nombreDepartamento=req.param("nombreDepartamento");
  const ModeloDepartamento = require("./modelo/Departamento");
  const ModeloLider=require("./modelo/Lider");
  ModeloDepartamento.find({nombre:nombreDepartamento})
    .then(respuesta => {
      console.log(respuesta);
      ModeloLider.findOneAndUpdate(
        //dato a buscar
        {
          nombre: nombre
        }, 
        //dato que se va a actualizar
        {
          idDepartamento: respuesta[0].id
        },
        {
          new: true,
          runValidators: true
        })
      .then(response => {
        res.send("1");
      })
      .catch(err => {
        res.send("0");
      })
      //res.json(respuesta)
    })
    .catch(err => {
      console.error(err)
    })
});

router.post("/cambiarDepartamentoEmpleado",(req,res)=>{
  var nombre=req.param("nombre");
  var nombreDepartamento=req.param("nombreDepartamento");
  const ModeloEmpleado=require("./modelo/Empleado");
  const ModeloDepartamento = require("./modelo/Departamento");
  ModeloDepartamento.find({nombre:nombreDepartamento})
    .then(respuesta => {
      console.log(respuesta)
      ModeloEmpleado.findOneAndUpdate(
        //dato a buscar
        {
          nombre: nombre
        }, 
        //dato que se va a actualizar
        {
          idDepartamento: respuesta[0].id
        },
        {
          new: true,
          runValidators: true
        })
      .then(response => {
        res.send("1");
      })
      .catch(err => {
        res.send("0");
      })
    })
    .catch(err => {
      console.error(err)
    })
});


module.exports = router;