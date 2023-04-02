
exports.up = function(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('favCity')
   
  })
};


exports.down = function(knex) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('favCity')
  })
};
