var express = require('express');
var router = express.Router();

const {list,show} = require('../controllers/moviesController');

/* /movies */
router.get('/list', list);
router.get('/show/:id',show);

module.exports = router;