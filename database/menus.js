
//CREAR EL ESQUEMA ESTRUCTURA DE MENUS

var mongoose = require("./connect");
var Schema = mongoose.Schema;
var menusSchema = Schema({

    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant"
    },

    nombre: String,

    precio: {
        type: Number
    },

    descripcion: String,

    fechaRegistro: {
        type: Date,
        default: Date.now()
    },

    foto:{
        type: String, 
        default: "No IMAGE",
        required: [true, "la ruta de la imagen es necesaria"]
    }
})

var Menus = mongoose.model("Menus", menusSchema);
module.exports = Menus;