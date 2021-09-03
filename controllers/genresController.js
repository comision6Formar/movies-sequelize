const db = require('../database/models')

module.exports = {
    list : (req,res) => {
        db.Genero.findAll()
        .then(genres => res.send(genres))
    },
    show : (req,res) => {
        
    }
}