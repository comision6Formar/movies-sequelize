const db = require('../database/models')

module.exports = {
    list : (req,res) => {
        db.Genero.findAll()
        .then(genres => res.render('genres',{
            title : 'Géneros',
            genres
        }))
    },
    show : (req,res) => {
        db.Genero.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {association : 'movies'}
            ]
        }).then(genre => {
            return res.render('genresDetail',{
                title : 'Género: ' + genre.name,
                genre
        })
    })
    }
}