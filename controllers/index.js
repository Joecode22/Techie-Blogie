// this line requires the express router
const router = require('express').Router();

//this line imports the userRoutes file
const userRoutes = require('./user-routes');
//this line imports the postRoutes file
const postRoutes = require('./post-routes');
//this line imports the homeRoutes file
const homeRoutes = require('./home-routes');


//this line tells the router to use the userRoutes file
router.use('/users', userRoutes);
//this line tells the router to use the postRoutes file
router.use('/posts', postRoutes);
//this line tells the router to use the homeRoutes file
router.use('/', homeRoutes);

//this line exports the router
module.exports = router;