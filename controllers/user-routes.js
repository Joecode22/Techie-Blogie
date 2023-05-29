const router = require('express').Router();
// Import the User model
const { User } = require('../../models');

// POST request for user signup
router.post('/signup', async (req, res) => {
    try {
        // we declare a new variable called userData that will await the creation of a new user with the req.body passed in as the argument
        const userData = await User.create(req.body);

        //this section uses sessions to store the user_id, username, and a boolean variable, logged_in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST request for user login
router.post('/login', async (req, res) => {
    try {
        //wait for the findOne method to find a user that matches the username passed in via req.body
        const userData = await User.findOne({ where: { username: req.body.username } });

        //if the username is not found, notify the user
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        //if the username is found, check the password using the checkPassword method from the User model
        const validPassword = await userData.checkPassword(req.body.password);

        //if the password is invalid, notify the user
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        //if the password is valid, save the session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            //notify the user that they are logged in
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// POST request for user logout
router.post('/logout', (req, res) => {
    //if the user is logged in, destroy the session
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
