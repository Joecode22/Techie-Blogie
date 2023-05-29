//This line creates the Post model using sequelize
const { Model, DataTypes } = require('sequelize');
//Give sequelize the connection info for the db
const sequelize = require('../config/connection');

//Defines the table columns and configuration of the post model as a javascript object
class Post extends Model {}

//Initialize the model by defining the columns and their data types
Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },

    //The following code configures sequalize specific features
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'post',
    }
  );
  
  module.exports = Post;