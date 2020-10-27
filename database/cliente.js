
//CREAR EL ESQUEMA ESTRUCTURA DE CLIENTE

var mongoose = require("./connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var clienteSchema = new Schema({
 
  nombre : String,  

  ci : String,

  telefono : Number,

  email : {
    type: String,
        required: [true, "El email es necesario"],
     

  },

  password : {
    type: String,
    required: [true, "El password es necesario"],
    min: [8, "El password debe tener un minimo de 8 caracteres"],
    max:[10, "El password debe tener como maximo 10 caracteres"],  
  },

  Fecha_Registro: {
      type: Date,
      default: Date.now()
  },
  //wilver carlo
  tipo : String
});

var cliente = mongoose.model("Cliente", clienteSchema);
module.exports = cliente;