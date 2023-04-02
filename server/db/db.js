const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getAllUsers,
  addUser,
  getUserByEmail
}

function getAllUsers(db=connection) {
 return db('users').select()
}

function getUserByEmail(email,db=connection) {
  return db('users').where('email',email).select("email","firstName","lastName","password").first()
}

function addUser(newUser,db=connection) {
  return db('users').insert(newUser)
}

