var express = require('express');
var router = express.Router();


var valid = {
    checkParams: function(evalueobj,refobj ) {
        
            refobj=['name','address','sex'];
      
        for(i=0;i<refobj.length;i++){
                
                    if(Object.hasOwnProperty.bind(evalueobj)(refobj[i])){
                            
                                var nom=evalueobj.name;
                                var rtr=evalueobj.address;
                                var sexx=evalueobj.sex;
                                var cont= (Object.keys(evalueobj).length);
                                var genm="masculino";
                                var genf="femenino";
                                console.log(cont);
                                if(cont !== 6){

                                    return false;
                                }
                                if(evalueobj.name==null){
                                    return false;
                                }
                                
                                if(!/[A-Z]+$/i.test(nom)){
                                
                                    return false;
                                }

                                if((!/[a-zA-Z _][#][_ 0-9]+$/.test(evalueobj.address))){
                                    console.log("error");
                                    return false;
                                }
                                
                                if(evalueobj.sex=="Mujer"||evalueobj.sex=="Hombre"||evalueobj.sex=="mujer"||evalueobj.sex=="hombre"){
                                    console.log("error");

                                    return true;
                                }
                                else{
                                    return false;
                                }
                                
                         return true;
                                 
                     }

                
            }      
        console.log(Object.hasOwnProperty.bind(evalueobj)('name'));
    },
    checkPassword: function (password) {

        return /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/g.test(password);
    },
    checkEmail:(email) =>{
        
        return /[\w\.]+@[\w\.]+\.\w{3,3}?$/g.test(email);
    }
    };
    module.exports = valid;