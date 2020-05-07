// Importações:
// Pacote Sequelize e seu arquivo de configuração para fazer a conexão com o banco de dados.
const Sequelize = require('sequelize');
const config = require('../config/database');

// Pacote bcrypt que será usado na criptografia da senha do usuário.
const bcrypt = require('bcrypt');

// Declaração da variável authController como objeto que contém os métodos a serem utilizados nas rotas.
const authController = {
    // método create que cuidará de renderizar a view com o formulário de login.
    create: (_req, res) => res.render('auth/login'),

    // método store responsável por efetuar o login do usuário, e por conter consulta no banco de dados precisa ser uma função assíncrona(async).
    store: async (req, res) => {
        // usando desestruturação para receber os dados preenchidos pelo usuário no form de login.
        const {
            email,
            password
        } = req.body;

        // estabelecimento de conexão com o banco de dados.
        const con = new Sequelize(config);

        // Armazenando a consulta da existência do usuário no banco de dados na variável "user"(array). Usando rawquery, usamos await senão receberíamos como resposta uma promisse.
        const [user] = await con.query(
            'SELECT * FROM users WHERE email= :email limit 1', {
                replacements: {
                    email,
                },
                type: Sequelize.QueryTypes.SELECT,
            }
        );
        
        // Verificação de cadastro e senha do usuário.
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.render('auth/login', {
                msg: 'Usuário ou senha errados!',
            });
        };

        // Caso o usuário passe pela verificação(email existente no banco de dados e hash da senha compatível com o salvo no banco de dados), trataremos de passar as informações necessárias do usuário para dentro da sessão.
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        res.redirect('/home');
    },


};

// Exportação da variável o que efetivamente é o nosso controller.
module.exports = authController;