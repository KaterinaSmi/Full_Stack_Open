import { useState, useEffect } from 'react'
import Display from './components/Display'
import Filter from './components/Filter'
import Form from './components/Form'
import phonesServices from './services/phones'
import './index.css'
import NotificationMessage from './components/NotificationMessage'






const App = () => {
  const [persons, setPersons] =  useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(' ')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState ('Some error occured')

  useEffect(() => {
    phonesServices
      .getAll()
      .then((phones) => {
        console.log("Fetched data:", phones);
        setPersons(phones); // Adjust based on actual data structure
      })
      .catch(error => console.error("Error fetching data", error));
  }, []);



  const addNameNumber = (event)=>{
    event.preventDefault()
    const ourObj = {name: newName,
      number:newNumber
    }
    //checking the existing names
    const nameExists = persons.find(person => person.name === newName)

    if(nameExists) {
      const updatedPerson = {...nameExists, number: newNumber};
      phonesServices
      .update(nameExists.id, updatedPerson)
      .then(returnedPerson =>{
        setPersons(persons.map(p =>p.id !== nameExists.id? p : returnedPerson));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error("Error updating contact", error);
        setErrorMessage("Error updating contact");
        setTimeout(() => setErrorMessage(null), 5000);
      });
      
    }else{
      phonesServices
      .create(ourObj)
      .then(phones=>{
        setPersons(persons.concat(phones))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error("Error creating contact", error);
        setErrorMessage("Error creating contact");
        setTimeout(() => setErrorMessage(null), 5000);
      });
    };
  };
  const handleDelete = (id) => {
    phonesServices
    .remove(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    }) .catch(error => {
      console.error("Error removing contact", error);
      const person = persons.filter(p => p.id = id)
      const personName = person ? person.name : "this contact"
      setErrorMessage(`Error removing '${personName}` );
      setTimeout(() => setErrorMessage(null), 5000);
    });
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
    person && person.name && person.name.toLowerCase().includes(filter.toLowerCase())
  );
  

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMessage message={errorMessage}/>
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
      persons={filteredPersons}
      handleDelete={handleDelete}/>
      
    </div>
  )
}

export default App