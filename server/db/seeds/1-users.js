/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').insert([
    {id: 1, firstName: 'Tian',lastName:'Zhou',email:'jwtian126@tian.com',password:'1234'},
    {id: 2, firstName: 'Ke',lastName:'Long',email:'ke123@ke.com',password:'1234'},
    {id: 3, firstName: 'Hermione',lastName:'Granger',email:'hermione456@hermione.com',password:'1234'}
  ]);
};
