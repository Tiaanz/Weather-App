const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getAllUsers,
  addUser
}

function getAllUsers(db=connection) {
 return db('users').select()
}

function addUser(newUser,db=connection) {
  return db('users').insert(newUser)
}

