var router = require('express').Router();

// split up route handling
router.use('/', require('./zone/add_zone.controller'))
router.use('/', require('./building/add_building.controller'))

module.exports = router;