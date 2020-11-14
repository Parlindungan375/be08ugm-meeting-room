import express from 'express'
import morgan from 'morgan';
import mongoose from 'mongoose';
import userRouter from './controllers/adminController.js';

import dotenv from 'dotenv';
import adminRouter from './controllers/adminController.js';
dotenv.config();

//connect db: admin: password; /nm db?
var uri = process.env.MONGODB_URI;

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () =>{
    console.log('Connection to db established.');
}
);

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//router
app.get('/', (req, res, next) => {
    res.json({
        message: 'success',
    });
});

app.use('/api/admin', adminRouter);

//listen to port
app.listen('8001', () => {
    console.log("server running on http://localhost:8001");
});
