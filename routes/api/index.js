const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const studentRoutes = require('./userRoutes');
const reactionRoutes = require('./reactionRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', studentRoutes);
route.use('/reactions', reactionRoutes);

module.exports = router;
