// Criando e exportando um model(representação de uma tabela no BD para o sequelize).
// O model é uma função que recebe 2 parâmetros, o primeiro é a variável que contém a conexão com o BD e o segundo é a definição do tipo de dado de cada coluna no BD.
module.exports = (sequelize, DataTypes) => {

    // Declaramos a variável que será nosso Model e dentro dela armazenamos o método ".define" da nossa conexão com o banco de dados, que por sua vez recebe 3 parâmetros, o primeiro é o nome do nosso Model(por padrão o sequelize usa esse parâmetro para nomear nossa tabela, portanto é boa prática usar no BD o nome da tabela no plural, pois o sequelize forma o nome da tabela colocando o nome do model no plural "nomeModel+s"), o segundo é a representação da nossa tabela do BD em forma de um objeto em que os parâmetros representam as colunas, e a cada parâmetro(coluna) devemos especificar o tipo de dado (type:), e qualquer especificidade desta coluna no BD, como se ela é a nossa primaryKey (primaryKey: boolen), se ela pode ou não ser nula (allowNull: boolean), se é auto incrementável (autoIncrement: boolean), etc. O terceiro parâmetro é opcional e vai dizer se o nosso model vai usar o padrão de timestamps ou não (timestamps: boolean), por padrão ele é true, portanto esse parâmetro só precisa ser declarado caso não utilizemos o padrão de timestamps, além disso nesse objeto de terceiro parâmetro podemos declarar o nome da nossa tabela no BD(pelo parâmetro tableName: "nomedatabela") caso não estejamos em acordo com o padrão do sequelize descrito acima.
    const Publication = sequelize.define('Publication', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        like: DataTypes.INTEGER,
        // Exemplo de foreign key gerada pela relação com a tabela usuários.
        users_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        create_at: DataTypes.DATE,
        update_at: DataTypes.DATE,
    },
    {
        timestamps: false    
    });

// Declaração das relações entre os models(tabelas no BD). Essas relações são demonstradas por meio do método ".associate" da variável que contém o nosso model. Ela recebe como parâmetro uma lista de models que vem do arquivo "models/index.js" e então dentro da função declaramos, usando os métodos de relações disponibilizados pelo sequelize (belongsTo, belongsToMany, hasOne, hasMany...), passando como primeiro parâmetro o model que tem essa relação e no segundo parâmetro um objeto com a chave que fez essa relação e um alias(as) opcional.

Publication.associate = (models) => {
    Publication.belongsTo(models.User, {
        foreignKey: 'users_id',
        as: 'user',
    });
}
    return Publication;
};