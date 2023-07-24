const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

//use either the thoughts or users routes
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
