var express = require('express');
var router = express.Router();

const {list,show,filter,search, topFive} = require('../controllers/moviesController');

/* /movies */
router.get('/list', list);
router.get('/show/:id',show);
router.get('/filter',filter);
router.get('/search',search);
router.get('/top-five',topFive);

module.exports = router;