const db = require('../database/models');
const {Op} = require('sequelize');

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
    },
    search : (req,res) => {
        let movies = db.Pelicula.findAll({
            where : {
                title : {
                    [Op.substring] : req.query.search
                }
            }
        })
        let genres = db.Genero.findAll();
        Promise.all([movies,genres])
        .then(([movies,genres]) => res.render('movies',{
            movies,
            genres,
            title : "Resultado de la búsqueda: " + req.query.search
        }))
    },
    topFive : (req,res) => {
        let movies = db.Pelicula.findAll({
            order : [
                ['rating','DESC']
            ],
            limit : 5
        
        })
        let genres = db.Genero.findAll();
        Promise.all([movies,genres])
        .then(([movies,genres]) => res.render('movies',{
            movies,
            genres,
            title : 'Top Five'
        }))
    }
}