const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const { Model } = require('sequelize');

//GET request to fetch all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'post_url', 'title', 'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        res.json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET request to fetch a single post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'post_url', 'title', 'created_at',
                [sequelize.literal('SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id')], 
    }