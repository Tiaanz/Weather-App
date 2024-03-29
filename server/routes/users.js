const express = require('express')
const db = require('../db/db')
const checkJwt = require('../auth0')

const router = express.Router()

//get all users
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Database error' })
  }
})

//get user by ID
router.get('/user/:id', async (req, res) => {
  try {
    const user = await db.getUserById(Number(req.params.id))
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Database error' })
  }
})

//get user by authId
router.get('/user-auth/:id', async (req, res) => {
  try {
    const user = await db.getUserByAuthId(req.params.id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Database error' })
  }
})

//add new user
router.post('/', async (req, res) => {
  try {
    await db.addUser(req.body)
    res.status(200).json({ message: 'new user has been added' })
  } catch (error) {
    res.status(500).json({ error: 'Database error' })
  }
})

//add favorite city
router.patch('/favCity', checkJwt, async (req, res) => {
  try {
    let favCities
    const auth0Id = req.auth?.sub

    if (!auth0Id) {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    } 

    const user = await db.getUserById(Number(req.body.id))
    if (user.favCity && user.favCity.includes(',')) {
      favCities = user.favCity.split(',')
    } else {
      favCities = [user.favCity]
    }
    const city = favCities.find((item) => item === req.body.city)
    const updatedUser = {
      ...user,
      favCity: !user.favCity
        ? req.body.city
        : city
        ? user.favCity
        : user.favCity + ',' + req.body.city,
    }
    await db.updateFavCity(updatedUser)
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Database error' })
  }
})

//delete favorite city
router.delete('/favCity', checkJwt, async (req, res) => {
  try {

    const auth0Id = req.auth?.sub

    if (!auth0Id) {
      console.error('No auth0Id')
      return res.status(401).send('Unauthorized')
    } 

    const user = await db.getUserById(Number(req.body.id))
    const favCities = user.favCity.split(',')
    const citiesArr = favCities.filter((item) => item !== req.body.city)
    const cities = citiesArr.toString()
    const updatedUser = { ...user, favCity: cities }
    await db.updateFavCity(updatedUser)
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
