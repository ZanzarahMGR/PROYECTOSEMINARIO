var express = require("express");
var router = express.Router();

var ORDEN = require("../database/orden");
var MENU = require("../database/menu"); 


//METODO GET DE ORDEN
router.get("/orden", (req,res,) =>{
    ORDEN.find({}).populate("menu").populate("restaurante").populate("user").exec((error,docs)=>{
    
        res.status(200).json(docs);
    });
    

});

//METODO POST DE ORDEN

router.post("/orden",  (req, res) => {
    var data = req.body;
    data ["registro del dia"] = new Date();
    var neworden = new ORDEN(data);
    neworden.save().then((rr) => {
        
        res.status(200).json(neworden);
        
    });
 });

//WILBER CARLO XD
//METODO PUT DE ORDEN
router.put("/orden", async(req, res) => {
    var params = req.query;
    var bodydata = req.body;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    var allowkeylist = ["precio","cantidad"];
    var keys = Object.keys(bodydata);
    var updateobjectdata = {};
    for (var i = 0; i < keys.length; i++) {
        if (allowkeylist.indexOf(keys[i]) > -1) {
            updateobjectdata[keys[i]] = bodydata[keys[i]];
        }
    }
    ORDEN.update({_id:  params.id}, {$set: updateobjectdata}, (err, docs) => {
       if (err) {
           res.status(500).json({msn: "Existen problemas en la base de datos"});
            return;
        } 
       res.status(200).json(docs);
       return;
    });
 });

 //METODO DELETE ORDEN
router.delete("/orden", (req, res) => {
    var params = req.query;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    ORDEN.remove({_id: params.id}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });
});

//METODO GET PARA REGISTRAR UN MENU A LA ORDEN


module.exports = router;