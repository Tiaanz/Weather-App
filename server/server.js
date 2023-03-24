const express = require('express')
const users= require('./routes/users')


const server = express()
server.use(express.json())

server.use('/api/v1/users', users)

module.exports=server