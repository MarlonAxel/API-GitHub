const  express = require("express");
const dotenv = require('dotenv')
const router = require('./routes/router')
dotenv.config()

const app = express()
const port = process.env.PORT || 8181

app.use(router)

app.listen(port, (req, res)=>{
    console.log('Servidor rodando na porta:: ',port);
})


