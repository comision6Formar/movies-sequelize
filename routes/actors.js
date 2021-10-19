var express = require('express');
var router = express.Router();

const {list,show} = require('../controllers/actorsController');

/* /movies */
router.get('/list', list);
router.get('/show/:id',show);

module.exports = router;