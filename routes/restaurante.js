var express = require("express");
var router = express.Router();
var REST= require("../database/restaurante");

//METODO DE GET PARA RESTAURANTE

router.get("/restaurante",(req,res)=>{

    //http://localhost:8000/api/1.0/restaurante?
    var filter={};
    var params=req.query;
    var select="";
   
    var order = {};
    //FILTRAR POR NOMBRE
    //http://localhost:8000/api/1.0/restaurante?name=zanzarah
    if(params.name != null){
        var expresion=new RegExp(params.name);
        filter["name"]=expresion;
       
    }
    //FILTRAR DIFERENTES DATOS
    //http://localhost:8000/api/1.0/restaurante?name=zanzarah&filters=name,nit
    if(params.filters != null){
        select =params.filters.replace(/,/g, " ");
    }
     //filtrar el orden segun el nombre
     //http://localhost:8000/api/1.0/restaurante?filters=name,nit&agegt=10&&agelt=60&order=name,1
     

    if (params.order != null) {
        var data = params.order.split(",");
        var number = parseInt(data[1]);
        order[data[0]] = number;
    }   
   REST.find(filter).
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

//METODO POST PARA RESTAURANTE

router.post("/restaurante",(req,res)=>{
    var RESTRest =req.body;
    var RESTDB=new REST (RESTRest);
    RESTDB.save((err,docs)=>{
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

//METODO PUT PARA RESTAURANTE

router.put("/restaurante",(req,res)=>{
    var params=req.query;
    var bodydata=req.body;
    if(params.id == null){
        res.status(300),json({msn: "EL parametro ID es necesario"});
        return;
    }
    var allowkeylist = ["name","propietario","nit", "direccion", "telefono"];
    var keys = Object.keys(bodydata);
    var updateobjectdata = {};
    
    for (var i = 0; i < keys.length; i++) {
        if (allowkeylist.indexOf(keys[i]) > -1) {  
            updateobjectdata[keys[i]] = bodydata[keys[i]];
        }
    }
    
   REST.update({_id: params.id},{$set: updateobjectdata}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });
});

//METODO DELETE PARA RESTAURANTE

router.delete("/restaurante",(req,res)=>{
    var params = req.query;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    REST.remove({_id: params.id}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });
});

module.exports = router;