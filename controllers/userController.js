const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const config = require('../config/database');

const userController = {

    // método que irá exibir a view de formulário para o usuário.
    // _ antes do req, para dizer que estamos pulando o primeiro parâmetro e vamos usar apenas o segundo.
    create: (_req, res) => res.render('auth/register'),



    // método que irá salvar as informações preenchidas pelo usuário no banco de dados.
    // "async" antes da função para dizer que é assíncrona ou seja o script não precisa parar nela até receber resposta.
    store: async (req, res) => {
        
        // desetruturação para receber os dados dos campos do formulário de registro
        const {
            name,
            email,
            password,
            username
        } = req.body;

        // criar conexão com o banco
        const con = new Sequelize(config);


        // encriptar a senha do usuário
        const hashPassword = bcrypt.hashSync(password, 10);


        // Raw query que o sequelize vai levar ao banco de dados, "await" antes da raw query, pois é a resposta que o sistema espera e junto com o "async" mostra que o script não deve ficar "travado" aqui até receber a resposta. Dentro do método .query(aplicado na variável "con" que é a conexão com o banco de dados) inserimos, como uma string, a consulta ao banco, como se estivéssemos fazendo no próprio workbench. Para evitar SQL injection(técnica de invasão de sistemas) não podemos concatenar as variáveis no "values" dentro da query, então usamos antes dos values ":" e colocamos como segundo parâmetro um objeto com a propiedade replacements, é aí que colocaremos os dados recebidos do formulário e que irão substituir os valores no momento da consulta. Também dentro desse objeto precisamos especificar o tipo de consulta que estamos fazendo na query para que o sequelize faça o correto "tratamento" dos dados garantindo a compatibilidade das informações.
        const user = await con.query(
            "INSERT INTO users (name, username, email, password, create_at, update_at) values (:name, :username, :email, :password, :create_at, :update_at)", {
                replacements: {
                    name,
                    username,
                    email,
                    password: hashPassword,
                    create_at: new Date(),
                    update_at: new Date()
                },
                type: Sequelize.QueryTypes.INSERT
            }
        );

        // verificação de sucesso da "gravação" do usuário no banco de dados. Checamos se a variável user(que armazena a resposta do banco de dados, ou seja, true para sucesso e false se algo deu errado e os dados não foram aceitos.)

        if(!user) {
            return res.render('auth/register', {
                msg: "Erro ao cadastrar usuário!",
            });
        }

        return res.redirect("/home");

    },

};

module.exports = userController;