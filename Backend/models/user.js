const sequelize = require("../utils/database");
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {          
        type: Sequelize.STRING,
        allowNull: true
    },
    photoURL: {        
        type: Sequelize.STRING,
        allowNull: true
    },
    isPremiumUser: { 
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = User;
