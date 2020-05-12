// Criação e exportação da lógica de autorização do usuário no sistema. Lógica baseada na session que o pacote "express-session" proporciona e que fica armazenada na requisição (req.session).
module.exports = (req, res, next) => {
    if(!req.session.user) res.redirect('login')
    next();
};