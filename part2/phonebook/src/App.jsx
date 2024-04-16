import { useState } from 'react'
import {Filter,PersonForm,Persons} from './PersonComp'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [search, setSearch] = useState('')

  const [filteredPersons, setFilteredPersons] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    console.log('nameObject', nameObject)
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    let personList = persons.concat(nameObject)
    setPersons(personList)
    setNewName('')
    setNewNumber('')
    if (search === '') {
      setFilteredPersons(personList)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    // console.log('handleSearchChange ',event.target.value)
    const searchName = event.target.value
    setSearch(searchName)
    if (searchName === '') {
      console.log('searchName is empty' , persons)
      setFilteredPersons(persons)      
    } else{
      const filtered = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
      setFilteredPersons(filtered)
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />

      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App