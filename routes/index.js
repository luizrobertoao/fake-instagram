// Importações necessárias para o funcionamento das rotas:
// Pacote express
const express = require("express");
// Execução da função Router do express.
const router = express.Router();
// Importação dos controllers que "comandam" as rotas:
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

const upload = require('../config/uploads');
const auth = require('../middleware/auth');


// **INICIO ROTAS**

// Rota principal, que também leva para a página de login.
router.get("/", authController.create);


// Rotas para login do usuário
router.get("/login", authController.create);
router.post("/login", authController.store);

// ROTAS PARA REGISTRO DO USUÁRIO:
// rota para renderização do formulário
router.get("/registro", userController.create);
// rota para salvar os dados do usuário no banco de dados.
router.post("/registro", userController.store);

router.get("/home", function (req, res, next) {
  res.render("index", {
    title: "Express"
  });
});

// Rota para criar novo post
router.get("/publicar", auth, postController.create);
router.post('/publicar', upload.any(), postController.store);

module.exports = router;