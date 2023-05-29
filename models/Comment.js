//This line creates the Comment model using sequelize
const { Model, DataTypes } = require('sequelize');
//Give sequelize the connection info for the db
const sequelize = require('../config/connection');

//Defines the table columns and configuration of the comment model as a javascript object
class Comment extends Model {}

//Initialize the model by defining the columns and their data types
Comment.init(
    {
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //This means the comment must be at least one character long
                len: [1]
            }
        },
        //This establishes the relationship between the comment and the user who made it
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        //This establishes the relationship between the comment and the post it was made on
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        //The following code configures sequalize specific features
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    });

module.exports = Comment;