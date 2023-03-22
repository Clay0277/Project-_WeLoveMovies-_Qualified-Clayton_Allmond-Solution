const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function nowShowing() {
  return knex("movies_theaters")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .select("*")
    .where("is_showing", true)
    .groupBy("movies_theaters.movie_id");
}

function read(movie_id) {
  return knex("movies").where({ movie_id }).first();
}

function listReviewsByMovieId(movieId) {
  return knex("reviews")
    .select("*")
    .where({ movie_id: movieId })
    .then((reviewsForMovies) => {
      const critics = reviewsForMovies.map((review) => {
        return knex("critics")
          .select("*")
          .where({ critic_id: review.critic_id })
          .then((critic) => {
            review.critic = critic[0];
            return review;
          });
      });
      const allCriticsForMovieReviews = Promise.all(critics);
      return allCriticsForMovieReviews;
    });
}

module.exports = {
  list,
  nowShowing,
  read,
  listReviewsByMovieId,
};
