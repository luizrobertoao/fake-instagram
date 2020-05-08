const Sequelize = require('sequelize');
const config = require('../config/database');
const {Publication} = require('../models');


const postController = {
    create: (_req, res) => {
        res.render('post')
    },
    store: async (req, res) => {
        const [post] = req.files;
        const { user } = req.session;
        const publication = await Publication.create({
            image: post.filename,
            like: 0,
            users_id: user.id,
            create_at: new Date(),
            update_at: new Date(),
        });

       return res.redirect('/home'); 

    }
};

module.exports = postController;