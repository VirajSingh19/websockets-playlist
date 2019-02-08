const express = require('express');
const socket = require('socket.io');
const bodyparser = require('body-parser');
const login = require('./login');
const message = require('./messages');
const users = require('./users');
const cors = require('cors');
const db = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    }
});


// App setup
const app = express();
const server = app.listen(process.env.PORT||4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(cors());
app.use('/users',users);
app.use('/login',login);
app.use('/message',message);




// Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        console.log(data);

        db.insert(data).into('message')
        .then(res=>{
            io.sockets.emit('chat-response',data);
        })
        .catch(err=>{
            console.log('error at chat-response');
            io.sockets.emit('chat-response', 'error');
        })
        // socket.broadcast.emit('chat', data);
    });

    // Handle typing event
    // socket.on('typing', function(data){
    //     socket.broadcast.emit('typing', data);
    // });

});

