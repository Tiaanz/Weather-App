
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('email')
    table.string('firstName')
    table.string('lastName')
    table.string('auth0Id')
    table.string('favCity')
  
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
