var express = require("express");

var router = express.Router();
var MENU= require("../database/menu");

//METODO DE GET PARA MENU

router.get("/menu",(req,res)=>{

    //http://localhost:8000/api/1.0/menu?
    var filter={};
    var params=req.query;
    var select="";
   
    var order = {};
    //FILTRAR POR NOMBRE
    //http://localhost:8000/api/1.0/menu?name=zanzarah
    if(params.name != null){
        var expresion=new RegExp(params.name, "i");
        filter["nombre"]=expresion;
       
    }
    //FILTRAR DIFERENTES DATOS
    //http://localhost:8000/api/1.0/menu?name=zanzarah&filters=name,nit
    if(params.filters != null){
        select =params.filters.replace(/,/g, " ");
    }
     //filtrar el orden segun el nombre
     //http://localhost:8000/api/1.0/menu?filters=name,nit&agegt=10&&agelt=60&order=name,1
     

    if (params.order != null) {
        var data = params.order.split(",");
        var number = parseInt(data[1]);
        order[data[0]] = number;
    }   
   MENU.find(filter).
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

//METODO POST PARA MENU

router.post("/menu",(req,res)=>{
    var RESTRest =req.body;
    var RESTDB=new MENU (RESTRest);
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

//METODO PUT PARA MENUS

router.put("/menu",(req,res)=>{
    var params=req.query;
    var bodydata=req.body;
    if(params.id == null){
        res.status(300),json({msn: "EL parametro ID es necesario"});
        return;
    }
    var allowkeylist = ["nombre","precio", "descripcion"];
    var keys = Object.keys(bodydata);
    var updateobjectdata = {};
    
    for (var i = 0; i < keys.length; i++) {
        if (allowkeylist.indexOf(keys[i]) > -1) {  
            updateobjectdata[keys[i]] = bodydata[keys[i]];
        }
    }
    
   MENU.update({_id: params.id},{$set: updateobjectdata}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });
});

//METODO DELETE PARA MENU

router.delete("/menu",(req,res)=>{
    var params = req.query;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    MENU.remove({_id: params.id}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });
});

module.exports = router;