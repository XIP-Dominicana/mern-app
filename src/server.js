//The backend
const express = require('express');

//To see the request in console
const morgan = require('morgan');

const { mongoose } = require('./database');

const app = express();

const path = require('path');

//------------------------------------------------------------------------------------Settings

/*process.env.PORT makes reference to the port that the cloud service give us*/
app.set('port', process.env.PORT || 3000);

//------------------------------------------------------------------------------------Middlewares
app.use(morgan('tiny'));

//To tell the server that i want communication in json format...
app.use(express.json());

//------------------------------------------------------------------------------------Routes
app.use('/api/task/', require('./routes/task.routes'));

//------------------------------------------------------------------------------------Statics files
app.use(express.static(path.join(__dirname, 'public')));

//starting server
app.listen(app.get('port'), function () {
    console.log(`Server on port ${app.get('port')} http://localhost:${app.get('port')}`);
});
