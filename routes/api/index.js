const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const studentRoutes = require('./userRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', studentRoutes);

module.exports = router;
