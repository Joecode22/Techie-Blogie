// this line requires the express router
const router = require('express').Router();

//this line imports the userRoutes file
const userRoutes = require('./userRoutes');
//this line imports the postRoutes file
const postRoutes = require('./postRoutes');
//this line imports the commentRoutes file
const commentRoutes = require('./commentRoutes');

//this line tells the router to use the userRoutes file
router.use('/users', userRoutes);
//this line tells the router to use the postRoutes file
router.use('/posts', postRoutes);
//this line tells the router to use the commentRoutes file
router.use('/comments', commentRoutes);

//this line exports the router
module.exports = router;