const express = require('express')
const app = express()
const empleadoRuta = express.Router()

//declaramos un objeto del modelo
let Empleado = require('../models/Empleado')
// { normalizeExtraEntryPoints } = require('@angular-devkit/build-angular/src/webpack/utils/helpers')

//agregar un nuevo empleado
empleadoRuta.route('/create').post((req,res,next)=>{

    Empleado.create(req.body)
    .then((data)=>{
        console.log('Se insertó el documento')
        res.send(data)
    })
    .catch((err)=>{
        console.error(err)
    })

})

//obtenemos todos los empleados
empleadoRuta.route('/empleados').get((req,res)=>{
   Empleado.find()
   .then((data)=>{
    res.send(data)
   })
   .catch((err)=>{
    console.error(err)
   })
})

//obtenemos un solo empleado por su id
empleadoRuta.route('/empleado/:id').get((req,res)=>{
    Empleado.findById(req.params.id)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.error(err)
    })
})

//actualizar un empleado
empleadoRuta.route('/update/:id').put((req,res)=>{
    Empleado.findByIdAndUpdate(req.params.id,{
        $set: req.body
    })
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.error(err)
    })
})

//eliminar empleado
empleadoRuta.route('/delete/:id').delete((req,res,next)=>{
    Empleado.findByIdAndRemove(req.params.id)
    .then((data)=>{
        console.log('Se eliminó el documento')
        res.send(data)
    })
    .catch((err)=>{
        console.error(err)
    })
})

module.exports = empleadoRuta;