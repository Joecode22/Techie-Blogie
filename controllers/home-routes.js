const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('dashboard', { 
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {
  if (req.session.logged_in) {
    try {
      const postData = await Post.findAll({
        where: {
          // use the ID from the session
          user_id: req.session.user_id,
        },
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in
      });

    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.redirect('/login');
  }
});


module.exports = router;
