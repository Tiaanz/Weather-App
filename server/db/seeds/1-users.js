/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').insert([
    {id: 1, userName: 'Tian',email:'jwtian126@tian.com'},
    {id: 2, userName: 'Ke',email:'ke123@ke.com'},
    {id: 3, userName: 'Linda',email:'linda456@linda.com'}
  ]);
};
