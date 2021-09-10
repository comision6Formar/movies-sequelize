const db = require("../database/models");
const { Op } = require("sequelize");
const moment = require('moment');

module.exports = {
    list: (req, res) => {
        let movies = db.Pelicula.findAll({
            include : [
                {association : 'genre'}
            ]
        });
        let genres = db.Genero.findAll();
        Promise.all([movies, genres])
            .then(([movies, genres]) => {
                //return res.send(movies)
                res.render("movies", {
                    title: "Peliculas",
                    movies,
                    genres,
                })
            })
            .catch((error) => console.log(error));
    },
    show: (req, res) => {
        db.Pelicula.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {association : 'genre'},
                {association : 'actors'}
            ]
        })
            .then(movie => {
                return res.render("moviesDetail", {
                    title : 'Película: ' + movie.title,
                    movie,
                })
            })
            .catch((error) => console.log(error));
    },
    filter: (req, res) => {
        let movies = db.Pelicula.findAll({
            where: {
                genre_id: req.query.genero,
            },
        });
        let genres = db.Genero.findAll();
        Promise.all([movies, genres]).then(([movies, genres]) =>
            res.render("movies", {
                movies,
                genres,
                title: "Filtrado por género",
            })
        );
    },
    search: (req, res) => {
        let movies = db.Pelicula.findAll({
            where: {
                title: {
                    [Op.substring]: req.query.search,
                },
            },
        });
        let genres = db.Genero.findAll();
        Promise.all([movies, genres]).then(([movies, genres]) =>
            res.render("movies", {
                movies,
                genres,
                title: "Resultado de la búsqueda: " + req.query.search,
            })
        );
    },
    order: (req, res) => {
        let corte = req.query.order.indexOf("/");
        let columna = req.query.order.substring(0, corte);
        let modo = req.query.order.substring(corte + 1);

        let movies = db.Pelicula.findAll({
            order: [[columna, modo]],
        });
        let genres = db.Genero.findAll();
        Promise.all([movies, genres]).then(([movies, genres]) =>
            res.render("movies", {
                movies,
                genres,
                title: "Ordenado por",
            })
        );
    },
    add: (req, res) => {
        db.Genero.findAll()
        .then(genres =>   res.render("moviesAdd", {
            title: "Agregar película",
            genres
        })).catch(error => console.log(error))
      
    },
    save : (req,res) => {

        db.Pelicula.create({

            ...req.body

        }).then(movie => {
            console.log(movie)
            return res.redirect('/movies/list')
        })
        .catch(error => console.log(error))
    },
    edit : (req,res) => {
        let genres = db.Genero.findAll();
        let movie = db.Pelicula.findByPk(req.params.id)
        Promise.all([genres,movie])
        .then(([genres,movie]) =>   res.render("moviesEdit", {
            title: "Editar película",
            genres,
            movie,
            fecha : moment(movie.release_date).format('YYYY-MM-DD')
        })).catch(error => console.log(error))
    },
    update : (req,res) => {

         db.Pelicula.update(
            {
                ...req.body
            },
            {
                where : {
                    id : req.params.id
                }
            }
        ).then( response => {
            console.log(response)
            return res.redirect('/movies/list')
        }).catch(error => console.log(error))
    },
    destroy : (req,res) => {
        db.Pelicula.destroy({
            where : {
                id : req.params.id
            }
        }).then( response => {
            console.log(response)
            return res.redirect('/movies/list')
        }).catch(error => console.log(error))
    }
 };
