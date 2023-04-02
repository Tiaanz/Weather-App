const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getAllUsers,
  addUser,
  getUserByEmail,
  updateFavCity,
  getUserById
}

function getAllUsers(db=connection) {
 return db('users').select()
}

function getUserByEmail(email,db=connection) {
  return db('users').where('email',email).select().first()
}

function getUserById(id,db=connection) {
  return db('users').where('id',id).select().first()
}

function addUser(newUser,db=connection) {
  return db('users').insert(newUser)
}

function updateFavCity(updatedUser,db=connection) {
  return db('users').update(updatedUser).where('id',updatedUser.id)
}

