// Importações:
// Pacote Sequelize e arquivo de configuração.
const Sequelize = require('sequelize');
const config = require('../config/database');

// Modelos das tabelas do BD. Importadas com método de desestruturação, pois tais modelos de tabelas do BD precisam primeiro passar pelo index da pasta models onde serão executados e exportados na forma de um array.
const {Publication, User} = require('../models');

// Moment
const moment = require('moment');

// Declaração da variável postController que vai conter os métodos que serão executados pelo controller.
const postController = {

    // Método create, encarregado de renderizar a view com o formulário do post. 
    create: (req, res) => {
        const { user } = req.session
        res.render('post', {user})
    },

    // Método store, encarregado de gravas as informações do post no banco de dados.
    store: async (req, res) => {

        // Recuperação e armazenamento (dentro do array post) das informações do arquivo upado pelo usuário no post.
        const [post] = req.files;

        // Recuperação e armazenamento (dentro do objeto user) das informações do usuário logado, ou seja que está salvo na sessão.
        const { user } = req.session;

        // Declaração da variável publication contendo o método create que vai gravar as informações do post no BD.
        const publication = await Publication.create({
            image: post.filename,
            like: 0,
            users_id: user.id,
            create_at: new Date(),
            update_at: new Date(),
        });

        // Redirecionamento do usuário para a página home.
        return res.redirect('/home'); 
    },
    index: async (req, res) => {
        const { user } = req.session;

        const publications = await Publication.findAll({
            include: 
                {
                    model: User,
                    as: 'user',
                    required: true,
                },
            order: [
                ['id', 'DESC']
            ]
        });

        res.render('index', {user, publications, moment});
    },
};

// Exportação da variável postController.
module.exports = postController;