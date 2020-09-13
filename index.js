const express = require ('express');
const morgan = require('morgan');
const { json } = require('express');
const cors = require ('cors');
const app = express();

const { mongoose } = require ('./database');

//Settings
app.set('port', process.env.PORT || 3000);

//Middelwares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/tasks',require('./routes/tasks.routes'));

//Start server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
