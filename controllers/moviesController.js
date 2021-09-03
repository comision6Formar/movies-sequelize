const db = require('../database/models');

module.exports = {
    list : (req,res) => {
        let movies = db.Pelicula.findAll();
        let genres = db.Genero.findAll();
        Promise.all([movies,genres])
        .then(([movies,genres]) => res.render('movies',{
            title : "Peliculas",
            movies,
            genres
        }))
        .catch(error => console.log(error))
    },
    show : (req,res) => {
        db.Pelicula.findByPk(req.params.id)
        .then(movie => res.render('movies_show',{
            title : movie.title,
            movie
        }))
        .catch(error => console.log(error))
    },
    filter : (req,res) => {
        let movies = db.Pelicula.findAll({
            where : {
                genre_id : req.query.genero
            }
        });
        let genres = db.Genero.findAll();
        Promise.all([movies,genres])
        .then(([movies,genres]) => res.render('movies',{
            movies,
            genres,
            title : "Filtrado por género"
        }))
    }
}