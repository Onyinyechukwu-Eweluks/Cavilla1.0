import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const businessRoute = require('./routes/business');
const employeeRoute = require('./routes/employees');
const categoryRoute = require('./routes/categories');
const userRoute = require('./routes/users');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

app.use(businessRoute);
app.use(employeeRoute);
app.use(categoryRoute);
app.use(userRoute);


export default app;

