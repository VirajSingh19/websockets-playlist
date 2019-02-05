const express = require('express');
// const socket = require('socket.io');
const r  = express.Router();
const db = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    }
  });

  r.post('/',(req,res)=>{
    let response = {name:'',credentials:'wrong'};
    db.select().from('Users').then( data=>{
      let u = req.body.name;
      let p = req.body.password;

      for(let i=0;i<data.length;i++)
      {
        if(u===data[i].name && p===data[i].password)
        {
          response.name = u;
          response.credentials='correct';
          console.log('matched');
          break;
        }
      }
      // console.log('name is',u,'password is',p);
      // console.log('db is ',data[0]);
      res.json(response);
    })
  });

 
  


  r.post('/signup',(req,res)=>{
    let signup_response = {name:'',status:'unregistered'};
    let u =req.body.name;
    let p = req.body.password;
    let flag = false;
    console.log('body is ',req.body);
    db.select().from('Users').then( data=>{
      let u2 = req.body.name;
      let p2 = req.body.password;
      console.log('data is',data);
      for(let i=0;i<data.length;i++)
      {
        if(u2===data[i].name)
        {
          signup_response.status='already';
          console.log('matched');
        }
      }
      if(signup_response.status==='unregistered'){
        console.log('unregistered');


        db.insert(req.body).into('users')
        .then(data=>{
          console.log('registered ',data);
          signup_response.status='successfuly registered';
          res.json(signup_response);
        })
        .catch(err=>{
          signup_response.status='error';
          res.json(signup_response);
        })
      
      
      }
     else {
        console.log('already regitered');
        res.json(signup_response);
      }
    });
   });



  module.exports = r;
 