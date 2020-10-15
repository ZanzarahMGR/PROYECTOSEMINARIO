//CREAR EL ESQUEMA ESTRUCTURA DE LA TABLA DE ORDEN
var mongoose= require("./connect");

var Schema = mongoose.Schema;
var ORDENSCHEMA =new Schema({

    menu:[{
        type: Schema.Types.ObjectId,
        ref: "menu"
        
    }],  
    restaurante:[{
        type: Schema.Types.ObjectId,
        ref: "restaurante"
    }],   
    cantidad:{
        type: Number,
    },
    user:[{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    lugar_de_envio:{
        type: String,
    },
    pago_total: {
        type: Number,
    },
    fecha:{
        type: Date,
        default: Date.now
    }

   

});
var ORDEN = mongoose.model("orden",ORDENSCHEMA);
module.exports=ORDEN;