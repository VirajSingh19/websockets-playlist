const express = require('express');
const r  = express.Router();


const db = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    }
  });

  r.post('/',(req,res)=>{
    
      response={data:0};
      let u = req.body.handle;
    
      db('users').whereNot({
        name:u
      }).select('name').then( data=>{
        
        
        
        if(data.length!==0){
          let arr = [];
          for(let i=0;i<data.length;i++) {
            arr.push(data[i].name);  
          }        
          res.json(arr);
        }
        else{ 
          res.json(response);
        }
      }).catch( err => {
        console.log(err);
        response.credentials=err;
        res.json(response);
      });

      
      // console.log('name is',u,'password is',p);
      // console.log('db is ',data[0]);
     
    });
 
  

  module.exports = r;
 