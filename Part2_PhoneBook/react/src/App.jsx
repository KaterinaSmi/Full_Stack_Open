import { useState } from 'react'
import Display from './components/Display'
import Filter from './components/Filter'
import Form from './components/Form'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(' ')
  const [filter, setFilter] = useState('')


  const addNameNumber = (event)=>{
    event.preventDefault()
    const ourObj = {name: newName,
      number:newNumber
    }
 

    //checking the existing names
    const nameExists = persons.find(person => person.name === newName)

    if(nameExists) {
      alert(`${newName} is already added to the phonebook`)
    }else{
      setPersons(persons.concat(ourObj))
      setNewName('')
      setNewNumber('')
    }
  } 
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
 
  const handleNumberChange = (event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2> Add a New</h2>
      <Form 
      onSubmit={addNameNumber}
      newName={newName}
      handlePersonChange={handlePersonChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
        
      <h2>Numbers</h2>
      <Display
      persons={filteredPersons}/>
     
    </div>
  )
}

export default App