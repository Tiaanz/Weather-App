const express = require('express')
const db = require('../db/db')
const bcrypt =require('bcrypt')

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
    // const salt = await bcrypt.genSalt()
    const hashedPwd = await bcrypt.hash(req.body.password, 10)

    const newUser = {...req.body,password:hashedPwd}
    await db.addUser(newUser)
    res.status(200).json({ message: 'new user has been added' })
  } catch (error) {
   
    res.status(500).json({ error: 'Database error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    
    const user = await db.getUserByEmail(req.body.email)
    if (!user) {
      return res.json({message:"Cannot find user"})
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
    res.json(user)
    } else {
      res.json({message: 'incorrect password'})
  }

  } catch (error) {
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
