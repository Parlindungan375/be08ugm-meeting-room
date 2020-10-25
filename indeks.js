import express from 'express';

const app = express();

app.get('/', (req, res, next) => {

res.json({

message: 'success',

});

});

app.listen('3000', () => {

console.log("server running on http://localhost:3000");