exports.seed = async (knex) => {
  await knex('users').del()
}