// Importações necessárias para o funcionamento das rotas:
// Pacote express
const express = require("express");
// Execução da função Router do express.
const router = express.Router();
// Importação dos controllers que "comandam" as rotas:
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
// Importação da configuração do multer.
const upload = require('../config/uploads');
// Importação do middleware auth, que verifica se o usuário já está logado.
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

// Rota para o feed.
router.get("/home", auth, postController.index);

// Rota para comentário.
router.post("/comentar/:idPost", commentController.store);

// Rota para criar novo post:
// Na rota GET incluimos o middleware "auth" para restringir o acesso aos usuários logados.
router.get("/publicar", auth, postController.create);
// Na rota POST incluimos o middleware(que na verdade está dentro da pasta config por se tratar de uma configuração do sistema) com a execução do método ".any()", o que autoriza o usuário a upar mais de um arquivo.
router.post('/publicar', upload.any(), postController.store);

module.exports = router;