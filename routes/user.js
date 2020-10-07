var express = require("express");
var sha1 = require("sha1");
var router = express.Router();
var USER = require("../database/user");

//METODO GET PARA USER
//MOSTRAR DATOS
router.get("/user",(req,res)=>{
    //filtrar
    //http://localhost:8000/api/1.0/user?
    var filter={};
    var params=req.query;
    var select="";
    var aux = {};
    var order = {};
    //filtrar un nombre
    //http://localhost:8000/api/1.0/user?name=zanzarah
    if(params.name != null){
        var expresion=new RegExp(params.name);
        filter["name"]=expresion;
       
    }
    //filtrar mas datos
    //http://localhost:8000/api/1.0/user?name=zanzarah&filters=name,email
    if(params.filters != null){
        select =params.filters.replace(/,/g, " ");
    }

    //filtrar edad rango
   // http://localhost:8000/api/1.0/user?filters=name,email&agegt=20&&agelt=20    
    if (params.agegt != null) {
        var gt = parseInt(params.agegt);
        aux["$gt"] =  gt;
    }
    if (params.agelt != null) {
        var gl = parseInt(params.agelt);
        aux["$lt"] =  gl;
    }
    if (aux != {}) {
        filter["age"] = aux;
    }
     //filtrar el orden segun el nombre
     //http://localhost:8000/api/1.0/user?filters=name,email&agegt=20&&agelt=20&order=name,1
     

    if (params.order != null) {
        var data = params.order.split(",");
        var number = parseInt(data[1]);
        order[data[0]] = number;
    }

   USER.find(filter).
   select(select). 
   sort(order).  
   exec((err,docs)=>{
       if(err){
           res.status(500).json({msn:"Error en el servidor"});
           return;
       }
       res.status(200).json(docs);
       return;
   });
});
//SUBIR INFORMACION
router.post("/user",(req,res)=>{
    var userRest =req.body;
    var userDB=new USER (userRest);
    
    userDB.save((err,docs)=>{
        if (err) {
            var errors = err.errors;
            var keys = Object.keys(errors);
            var msn = {};
            for (var i = 0; i < keys.length; i++) {
                msn[keys[i]] = errors[keys[i]].message;
            }
            res.status(500).json(msn);
            return;
        }
        res.status(200).json(docs);
        return;
    })

});

//METODO PUT PARA USER
//http://localhost:8000/api/1.0/user?id=5f41f83b76798e057c5796e1
router.put("/user",(req,res)=>{
    var params=req.query;
    var bodydata=req.body;
    if(params.id == null){
        res.status(300),json({msn: "EL parametro ID es necesario"});
        return;
    }
    var allowkeylist = ["name","name", "email", "age"];
    var keys = Object.keys(bodydata);
    var updateobjectdata = {};
    //filtrar los datos que no necestito que se actualize
    for (var i = 0; i < keys.length; i++) {
        if (allowkeylist.indexOf(keys[i]) > -1) {  
            updateobjectdata[keys[i]] = bodydata[keys[i]];
        }
    }
    //actualizamos los datos
    USER.update({_id: params.id},{$set: updateobjectdata}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });

});

//ELIMINAR USER POR ID
//http://localhost:8000/api/1.0/user?id=656sdhfyr5f753
router.delete("/user", (req, res) => {
    var params = req.query;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    USER.remove({_id: params.id}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });
});

//LOGIN
//http://localhost:8000/api/1.0/login
router.post("/login", async(req, res) => {
    var body = req.body;
    console.log(body.name);
    if (body.name == null) {
        res.status(300).json({msn: "El nombre es necesario"});
             return;
    }
    if (body.password == null) {
        res.status(300).json({msn: "El password es necesario"});
        return;
    }
    var results = await USER.find({name: body.name, password:body.password});
    console.log(results);
    if (results.length == 1) {
        res.status(200).json({msn: "Bienvenido " + body.name + " al sistema"});
        return;
    }
    res.status(200).json({msn: "Credenciales incorrectas"});
});

module.exports = router;
