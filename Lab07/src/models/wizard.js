const validator = require('validator')
const mongoose = require('mongoose')

const wizardSchema = mongoose.Schema({
  name: {
    type: String
  },
  age: {
    type: Number
  },
  house: {
    type: String
  },
  playedBy: {
    type: String
  },
  mascot: {
    type: String
  },
  pureblood: {
    type: Boolean
  }
})

const Wizard = mongoose.model('Wizard', wizardSchema)

module.exports = Person
