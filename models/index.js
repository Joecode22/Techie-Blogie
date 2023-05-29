const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// create associations
//a user can have many posts
User.hasMany(Post, {
  foreignKey: 'user_id'
});

//a post can belong to one user
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

//a comment can belong to one user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

//a comment can belong to one post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

//a user can have many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
});

//a post can have many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };
