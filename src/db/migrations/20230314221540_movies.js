exports.up = function (knex) {
  return knex.schema.createTable("movies", function (table) {
    table.increments("movie_id").primary();
    table.string("title").notNullable();
    table.integer("runtime_in_minutes").unsigned().notNullable();
    table.string("rating").notNullable();
    table.text("description", 1000).notNullable();
    table.string("image_url").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies");
};
