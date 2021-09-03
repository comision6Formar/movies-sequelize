var express = require('express');
var router = express.Router();

const {list,show, filter} = require('../controllers/moviesController');

/* /movies */
router.get('/list', list);
router.get('/show/:id',show);
router.get('/filter',filter)

module.exports = router;