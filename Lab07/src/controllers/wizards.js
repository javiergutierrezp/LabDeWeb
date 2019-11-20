const Wizard = require('../models/wizard.js')

User

const getWizards = function(req, res) {
  Wizard.find({}).then(function(wizards) {
    res.send(wizards)
  }).catch(function(error){
    res.status(500).send({ error })
  })
}

const getWizard = function(req, res) {
  _id = req.params.id
  Wizard.findById(_id).then(function(wizard) {
    if ( !wizard ) {
      return res.send({ error : 'Wizard not found' })
    }
    return res.send(wizard)
  }).catch(function(error) {
    return res.status(404).send({ error })
  })
}

const createWizard = function(req, res) {
  const wizard = new Wizard(req.body)
  wizard.save().then(function() {
    return res.send(wizard)
  }).catch(function(error) {
    return res.status(400).send({ error })
  })
}

const updateWizard = function(req, res) {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'age', 'mascot']
  // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if( !isValidUpdate ) {
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }
  Wizard.findByIdAndUpdate(_id, req.body ).then(function(wizard) {
    if (!wizard) {
      return res.status(404).send({})
    }
    return res.send(wizard)
  }).catch(function(error) {
    res.status(500).send({ error })
  })
}

const deleteWizard = function(req, res) {
  const _id = req.params.id
  Wizard.findByIdAndDelete(_id).then(function(wizard){
    if(!wizard) {
      return res.status(404).send({})
    }
    return res.send(wizard)
  }).catch(function(error) {
    res.status(505).send({ error })
  })
}

module.exports = { 
  getWizards,
  getWizard,
  createWizard,
  updateWizard,
  deleteWizard
}