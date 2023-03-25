const express = require('express')
const db = require('../db/db')

const router = express.Router()

//get all users
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Database error' })
  }
})

//add new user
router.post('/', async (req, res) => {
  try {
    const newUser = req.body
    await db.addUser(newUser)
    res.status(200).json({ message: 'new user has been added' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
