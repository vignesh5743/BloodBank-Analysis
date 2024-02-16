const express =require('express');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

const dbconfig = require('./config/dbconfig');
app.use(express.json());

const usersRoute = require('./routes/usersRoutes');
app.use('/api/users',usersRoute);


const inventoryRoute = require('./routes/inventoryRoute');
app.use('/api/inventory', inventoryRoute);


const dashboardRoute = require('./routes/dashboardRoute');
app.use('/api/dashboard', dashboardRoute);

//const querycontroller = require('./controller)
const queryRoute = require('./routes/queryRoute');
app.use('/api', queryRoute);

//const query1Controller = require('./controller/query1ctl');

// Create a new route for Query1
// app.use('/api/query1', query1Controller);

 
app.listen(port, ()=>console.log(`node JS server started at ${port}`));


