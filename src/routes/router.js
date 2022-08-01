const  express = require("express");
const router = express.Router()
const controller = require('../controller/controller')

router.get('/buscaDados/:name', controller.getInfoGitHub)


module.exports = router