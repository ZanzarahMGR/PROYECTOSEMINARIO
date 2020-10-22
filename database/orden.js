var mongoose = require("./connect");

const Schema = mongoose.Schema;

var ordenSchema = new Schema({


  cliente: {
  type: Schema.Types.ObjectId,
  ref: "Cliente"
  },

  restaurant:{
    type: Schema.Types.ObjectId,
    ref: "Restaurant"
  },
  menus : {
    type: Schema.Types.ObjectId,
    ref: "Menus"
  },
  lugar_envio: Number,
  precios : Number,
  cantidad :Number,
  Fecha_Registro:
    {
      type:Date,
      default: Date.now()

    },

pago_total : Number,
});
var orden = mongoose.model("Orden", ordenSchema);
module.exports = orden;