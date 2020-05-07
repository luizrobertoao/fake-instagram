const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

router.get("/", function (req, res, next) {
  res.render("auth/login", { title: "Express" });
});

router.get("/login", function (req, res, next) {
  res.render("auth/login", { title: "Express" });
});

// ROTAS PARA REGISTRO DO USUÁRIO:
// rota para renderização do formulário
router.get("/registro", userController.create);
// rota para salvar os dados do usuário no banco de dados.
router.post("/registro", userController.store);

router.get("/home", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
