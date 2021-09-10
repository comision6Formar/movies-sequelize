var express = require('express');
var router = express.Router();

const {list,show,filter,search, order,add,save,edit,update, destroy} = require('../controllers/moviesController');

/* /movies */
router.get('/list', list);
router.get('/show/:id',show);
router.get('/filter',filter);
router.get('/search',search);
router.get('/order',order);

router.get('/add',add);
router.post('/add',save);
router.get('/edit/:id',edit);
router.put('/update/:id',update);
router.delete('/destroy/:id',destroy);


module.exports = router;