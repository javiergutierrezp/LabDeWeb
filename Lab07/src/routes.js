const express = require('express')
const wizards = require('./controllers/wizards')

const router = express.Router()

router.get('/wizards', wizards.getUsers)
router.get('/wizards/:id', wizards.getUser)
router.post('/wizards', wizards.createUser)
router.patch('/wizards/:id', wizards.updateUser)
router.delete('/wizards/:id', wizards.deleteUser)

module.exports = router