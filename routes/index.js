var express = require('express');
var router = express.Router();

var USER =require("../database/user");



/*router.get('/', function(req, res, next) {
  
  console.log("ingreso al index /api/v1.0")
  
  res.status(200).json({
      msm:"Bienvenido al Proyecto Seminario"
  });
 
});*/

//RUTAS DE PRUEBA EN POSTMAN
router.get('/usuario', (req, res, next) =>{
  
  var datos =req.query; 
  var name= datos.name; 
   console.log(datos); 
   console.log(name);
  
  res.status(200).json({
      msm:"Nombre :" + name 
  });


  USER.find({},(err,docs)=>{
    res.status(200).json(docs);
  });
  

 
});

router.post('/usuario', (req, res, next) =>{
  
  var datos =req.body;
  
  console.log(datos);
  datos["timeserver"] =new Date();
  datos["method"] ="POST";
//almacenar los datos antes de subirlo a la base de datos
  var user={};
  user["name"]= datos.name;
  user["lastname"]=datos.lastname;
  user["date"]=new Date();

//guardar a la base de datos
var newuser=new USER(user);
  newuser.save().then(()=>{
    res.status(200).json({"msn":"Usuario Registrado"});
  });


  res.status(200).json(datos); 
});

router.put("/usuario",(req,res)=>{
  var datos =req.body;
  console.log(datos); 
  datos["timeserver"] =new Date();
  datos["method"] ="PUT";
  res.status(200).json(datos); 
})

router.delete('/usuario', (req, res, next) =>{
  
  var datos =req.query; 
  var id= datos.id; 
   console.log(datos); 
   console.log(id);
  
  res.status(200).json({
      msm:"DELETE"
  });
 
});
module.exports = router;
