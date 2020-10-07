//CREAR EL ESQUEMA ESTRUCTURA DE LA TABLA DE MENUS


var mongoose= require("./connect"); 
var MENUSCHEMA =new mongoose.Schema({
    nombre:{
        type:String,
        required:[true,"EL nombre del restaurante es necesario"]
        
    },
    precio:{
        type:Number,
        required:[true,"Es necesario el NIT de su restaurante"]
        
    },
    descripcion:{
        type:String,
        required:[true,"Es necesario el nombre del propietario "]
        
    },
    fecha:{
        type: String,
        required:[true,"La direccion es necesario"],
        
    },
    fotografia:{
        type: String,
         
        required:[true,"El numero es necesario"],

    },
    
   

});
var MENU = mongoose.model("menu",MENUSCHEMA);
module.exports=MENU;