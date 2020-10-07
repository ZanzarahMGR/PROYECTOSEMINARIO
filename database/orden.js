//CREAR EL ESQUEMA ESTRUCTURA DE LA TABLA DE ORDEN
var mongoose= require("./connect"); 
var ORDENSCHEMA =new mongoose.Schema({

    id_menu:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu",
        
    },
    id_restaurante:{
        type: String,
        required:[true,"Es necesario el NIT de su restaurante"]
    },   
    fecha:{
        type: Date,
        default: Date.now
    }
   

});
var ORDEN = mongoose.model("orden",ORDENSCHEMA);
module.exports=ORDEN;