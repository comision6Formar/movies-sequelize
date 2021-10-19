const db = require('../database/models');

module.exports = {
    list : (req,res) => {
        db.Actor.findAll()
        .then(actors => res.send(actors))
    },
    show : (req,res) => {
        
    }
}