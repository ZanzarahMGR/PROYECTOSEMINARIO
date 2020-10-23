var express = require('express');
var router = express.Router();

var Menus = require("../database/menus");
var Cliente = require("../database/cliente");
var Orden = require("../database/orden");
//var Users = require("../database/user");

//var jwt = require("jsonwebtoken");

// LOGIN


router.post("/login", (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var result = Cliente.findOne({email: email,password: password}).exec((err, doc) => {
    if (err) {
      res.status(300).json({
        msn : "No se puede concretar con la peticion"
      });
      return;
    }
    console.log(doc);
    if (doc) {
        console.log(result);
        res.status(200).json(doc);
      /*jwt.sign({name: doc.email, password: doc.password}, "secretkey123", (err, token) => {
          console.log(result);
          res.status(200).json({
            resp:200,
            token : token,
            dato:doc
          });
      })*/
      
        console.log(result);
        res.status(200).json({
          resp:200,
          //token : token,
          dato:doc,
          msn : "ingreso"
          
        });
        
    
    } else {
      res.status(400).json({
        resp: 400,
        msn : "El usuario no existe en la base de datos"
      });
    }
  });
});

//Middelware
function verifytoken (req, res, next) {
  
  const header = req.headers["authorization"];
  if (header  == undefined) {
      res.status(403).json({
        msn: "No autorizado"
      })
  } else {
      req.token = header.split(" ")[1];
      jwt.verify(req.token, "secretkey123", (err, authData) => {
        if (err) {
          res.status(403).json({
            msn: "No autorizado"
          })
        } else {
          next();
        }
      });
  }
}

//METODO POST MENU 

router.post("/menus", (req, res) => {

  var data = req.body;
  data ["registerdate"] = new Date();
  var newmenus = new Menus(data);
  newmenus.save().then((rr) =>{
    res.status(200).json({
      "resp": 200,
      "dato": newmenus,
      "id" : rr._id,
      "msn" : "Menu agregado con exito"
    });
  });
});

//METOODO GET MENUS

router.get("/menus",(req, res) => {
  var skip = 0;
  var limit = 10;
  if (req.query.skip != null) {
    skip = req.query.skip;
  }

  if (req.query.limit != null) {
    limit = req.query.limit;
  }
  Menus.find({}).skip(skip).limit(limit).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn" : "Error en la db"
      });
      return;
    }
    
    res.status(200).json(
      docs
      
    );
  });
});

router.get(/menus\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Menus.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(400).json({
      "respuesta":400,
      "msn" : "No existe el recurso seleccionado"
    });
  })
});

//METODO DELETE MENUS

router.delete("/menus",(req,res)=>{

  console.log(req.query);
  var params = req.query;
  if (params.id == null) {
      res.status(300).json({msn: "El parámetro ID es necesario"});
      return;
  }
  Menus.remove({_id: params.id}, (err, docs) => {
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






//METODO PATCH MENUS

router.patch("/menus", (req, res) => {
  console.log(req.body);
    if (req.query.id == null) {
        res.status(300).json({
        msn: "Error no existe menu"
    });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    Menus.findByIdAndUpdate(id, params, (err, docs) => {
    res.status(200).json({
        msn:"Actualizado menu",
        docs
    });
    });
});


//METODO PUT MENUS

router.put("/menus", (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['nombre', 'precio', 'descripcion'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "No se puede actualizar error utilice el formato patch"
    });
    return;
  }

  var menus = {
    restaurant : req.body.restaurant,
    nombre : req.body.nombre,
    precio : req.body.precio,
    descripcion : req.body.descripcion,
    foto : req.body.foto

  };
  Menus.findOneAndUpdate({_id: id}, objupdate, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "No se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json({
        "resp": 200,
        "dato": menus,
        "msn" : "Menu editado con exito"
      });
      return;
  });
});

//METODO POST CLIENTE

router.post("/cliente",  (req, res) => {
console.log(req.body);
  var data = req.body;0
  data ["registerdate"] = new Date();
  var newcliente = new Cliente(data);
  newcliente.save().then((rr) =>{
    res.status(200).json({
      "resp": 200,
      "dato": newcliente,
      "msn" : "Cliente agregado"
    });
  });
});

//METODO GET CLIENTE

router.get("/cliente",(req, res) => {
  var skip = 0;
  var limit = 10;
  if (req.query.skip != null) {
    skip = req.query.skip;
  }

  if (req.query.limit != null) {
    limit = req.query.limit;
  }
  Cliente.find({}).skip(skip).limit(limit).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn" : "Error en la db"
      });
      return;
    }
    res.json({
      result : docs
    });
  });
});



router.get(/cliente\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Cliente.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el pedido "
    });
  })
});

//METODO DELETE CLIENTE

router.delete("/cliente", (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Cliente.find({_id : id}).remove().exec( (err, docs) => {
    res.json({
        message: "cliente eliminado"
        });
  });
});

//METODO PATCH CLIENTE

router.patch(/cliente\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split( "/")[4];
  var keys = Object.keys(req.body);
  var cliente = {
    nombre : req.body.nombre,
    ci : req.body.ci,
    telefono : req.body.telefono,
    email : req.body.email,

  };
  console.log(cliente);
  Cliente.findOneAndUpdate({_id: id}, cliente, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json({
        "resp": 200,
        "dato": cliente,
        "msn" : "Cliente editado con exito"
      });
      return;
  });
});

//METODO PUT CLIENTE
router.put(/cliente\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['nombre', 'ci', 'telefono', 'email'];
  var result = _.difference(oficialkeys, keys);
 
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Error no se puede actualizar intentar con patch"
    });fmulter
    return;
  }
  var cliente = {
    nombre : req.body.nombre,
    ci : req.body.ci,
    telefono : req.body.telefono,
    email : req.body.email,

  };
  Cliente.findOneAndUpdate({_id: id}, cliente, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json({
        "resp": 200,
        "dato": cliente,
        "msn" : "Cliente editado con exito"
      });
      return;
  });
});

//METODO POST ORDEN

router.post("/orden",  (req, res) => {

  var data = req.body;
  data ["registerdate"] = new Date();
  var neworden = new Orden(data);
  neworden.save().then((rr) =>{
    res.status(200).json({
      "resp": 200,
      "dato": neworden,
      "msn" : "Orden agregado con exito"
    });
  });
});
router.get("/orden", (req, res, next) =>{
  Orden.find({}).populate("menus").populate("cliente").populate("restaurant").exec((error, docs) => {
    res.status(200).json(docs);
  });
});

// METODO GET ORDEN

router.get(/orden\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Orden.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({

        "array_texto":
          {
            "texto":"<b>orden</b>",
            "texto":"registrado con exito"
          }


    });
  })
});

//METODO DELETE ORDEN

router.delete('/orden/:id', (req, res,) => {
  var idOrden = req.params.id;

  Orden.findByIdAndRemove(idOrden).exec()
      .then(() => {
          res.json({
              message: "Orden eliminado"
          });
      }).catch(err => {
          res.status(500).json({
              error: err
          });
      });


});

//METODO PATCH ORDEN

router.patch(/orden\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var orden = {};
  for (var i = 0; i < keys.length; i++) {
    orden[keys[i]] = req.body[keys[i]];
  }
  console.log(orden);
  Orden.findOneAndUpdate({_id: id}, orden, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json({
        "resp": 200,
        "dato": orden,
        "msn" : "Orden editado con exito"
      });
      return;
  });
});

//METODO PUT ORDEN

router.put(/orden\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['idmenu', 'idrestaurant', 'cantidad', 'idcliente', 'lat', 'lon', 'pagototal'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hacer uso del metodo patch si desea editar solo un fragmento de la informacion"
    });
    return;
  }

  var orden = {
    menu : req.body.idmenu,
    restaurant : req.body.idrestaurant,
    cliente : req.body.idcliente,
    lugar_envio : req.body.lugar_envio,
    cantidad : req.body.cantidad,
    precio : req.body.precio,
    pagototal : req.body.pagototal
  };
  Orden.findOneAndUpdate({_id: id}, orden, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos de la orden"
        });
        return;
      }
      res.status(200).json({
        "resp": 200,
        "dato": orden,
        "msn" : "Orden editado con exito"
      });
      return;
  });
});

module.exports = router;