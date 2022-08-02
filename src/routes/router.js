//Importações
const  express = require("express");
const router = express.Router()
const controller = require('../controller/controller')

//Rota para buscar os dados do gitHub
router.get('/buscaDados/:name', controller.getInfoGitHub)

//Exportando as rotas para ser utilizado em outras partes do código
module.exports = router