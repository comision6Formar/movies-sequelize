var express = require('express');
var router = express.Router();

const {list,show} = require('../controllers/genresController');

/* /genres */
router.get('/list', list);
router.get('/show/:id',show);

module.exports = router;