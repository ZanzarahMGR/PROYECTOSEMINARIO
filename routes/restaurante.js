var express = require("express");
//var sha1 = require("sha1");
var router = express.Router();
var REST= require("../database/restaurante");
//var IMG= require("../database/updateimg");
//var fileUpload = require("express-fileupload")
/*router.use(fileUpload({
    fileSize: 50 * 1024 * 1024
}));*/

//METODO GET RESTAURANTE 1


router.get("/restaurante",(req, res) => {
  var skip = 0;
  var limit = 10;
  if (req.query.skip != null) {
    skip = req.query.skip;
  }

  if (req.query.limit != null) {
    limit = req.query.limit;
  }
  REST.find({}).skip(skip).limit(limit).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn" : "Error en la db"
      });
      return;
    }
    res.status(200).json(docs);
  });
});

//METODO GET RESTAURANTE 2

router.get(/restaurante\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id1 =url;
  var id = url.split("/")[2];
  console.log(id);
  REST.find({cliente : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el pedido "
    });
  })
});

//METODO POST RESTAURANTE

router.post("/restaurante",(req, res) => {
  console.log(req.body);
    var data = req.body;
    data["registerdate"] = new Date();
    var newrestaurant = new REST(data);
    newrestaurant.save().then( (rr) => {
      res.status(200).json({
        "id" : rr._id,
        "msn" : "Restaurante Agregado con exito"
      });
      console.log(newrestaurant.body);
    });
  });

//METODO PUT RESTAURANTE

router.put("/restaurante",(req,res)=>{
    var params=req.query;
    var bodydata=req.body;
    if(params.id == null){
        res.status(300),json({msn: "EL parametro ID es necesario"});
        return;
    }
    REST.findByIdAndUpdate(params.id,bodydata,(err,docs)=>{
        if(err){
          res.json(500).json({
            message:'error'
          });
        }
        res.status(200).json();
      });
});

//METODO DELETE RESTAURANTE

router.delete("/restaurante",(req,res)=>{

    console.log(req.query);
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
         res.status(200).json({
             msm:"Eliminado",
             docs
         });
    });
});

//METODO PATCH RESTAURANTE

router.patch("/restaurante", (req, res) => {
  console.log(req.body);
    if (req.query.id == null) {
        res.status(300).json({
        msn: "Error no existe restaurante"
    });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    REST.findByIdAndUpdate(id, params, (err, docs) => {
    res.status(200).json({
        msn:"Actualizado",
        docs
    });
    });
});

module.exports = router;