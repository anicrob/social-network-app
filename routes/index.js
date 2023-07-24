const router = require('express').Router();
const apiRoutes = require('./api');

//only backend is complete, so use only /api routes
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
