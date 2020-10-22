//CONEXION CON LA BASE DE DATOS
//CREAMOS UNA VARIABLE PARA LA BASE DE DATOS
var mongoose =require("mongoose");
mongoose.connect("mongodb://172.18.0.2:27017/proyecto1database",{useNewUrlParser:true});
var db= mongoose.connection;
db.on("error",()=>{
    console.log("ERROR no se puede conectar al servidor");
});
db.on("open",()=>{
    console.log("Conexion Exitosa")
});
module.exports=mongoose; 