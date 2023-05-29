// require bcrypt for password hashing
const bcrypt = require('bcrypt');

// this line creates the user model using sequelize
const { Model, DataTypes } = require('sequelize');
// give sequelize the connection info for the db
const sequelize = require('../config/connection');

class User extends Model {

    // this method checks the current password with the hashed password in the db and returns true if they match and false if they don't
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define the table columns and configuration
User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4],
            },
        },
    },
    {
        hooks: {
            // Set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                if (updatedUserData.password) {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                }
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    });

module.exports = User;
