const peopleRouter = require('express').Router()
const Person = require('../models/people')

peopleRouter.get('/', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

peopleRouter.get('/:id', (req, res,next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person){
        res.json(person)
      } else {
        res.status(404).json({ error: ' Person not found' })
      }
    })
    .catch(error => next(error))
})


peopleRouter.get('/info',(req,res, next) => {
  Person.countDocuments({})
    .then(count => {
      const currentDate = new Date()
      const message = count === 0
        ? 'Phone book has no entries.'
        : `${count} person(s) have been added`
      res.send(
        `<p>${message}</p>
            <p>${currentDate}</p>`
      )
    })
    .catch(error => next(error))
})


peopleRouter.delete('/:id',(req,res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(deletedPerson => {
      res.status(200).end(deletedPerson)
    })
    .catch(error => next(error))
})

peopleRouter.put('/:id',(req,res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    //new: true - ensures you gt back a modified version
    //runValidators: true -
    .then(updatedPerson => {
      if(updatedPerson){
        res.json(updatedPerson)
      }
    })
    .catch(error => next(error))
})

peopleRouter.post('/', (req, res, next) => { // Added next parameter
  const body = req.body

  if (body.name.length < 3) {
    return res.status(400).json({ error: `Person validation failed: "${body.name}" is shorter than 3 symbols (allowed length)` })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      res.status(201).json(savedPerson)
    })
    .catch(error => {
      // Check if the error is a validation error
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
      }
      next(error)
    }) // Closing bracket added here
})

module.exports = peopleRouter
