const Sequelize = require('sequelize');
const config = require('../config/database');

const {Publication, User, Comment} = require('../models');

const commentController = {
    
    store: async (req, res) => {
        
        const { idPost } = req.params;
        
        const { description } = req.body;

        const { user } = req.session;

        const newComment = await Comment.create({
            description,
            user_id: user.id,
            publications_id: idPost,
            create_at: new Date(),
            upate_at: new Date(),
        });

        if(!newComment) {
            console.log("Erro ao postar comentário");
        }

        return res.redirect('/home');
    }
};

module.exports = commentController;