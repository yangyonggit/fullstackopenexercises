import { useState, useEffect} from 'react'
import {Filter,PersonForm,Persons} from './PersonComp'
import PersonHttp from './PersonHttp'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [search, setSearch] = useState('')

  const [filteredPersons, setFilteredPersons] = useState(persons)


  
  useEffect( () => {
    console.log('effect')
    PersonHttp.getAll()
      .then(initPersons => {
        console.log('promise fulfilled')
        console.log(initPersons)
        setPersons(initPersons)
      })
  }, [])

   // 监听 persons 的变化并更新 filteredPersons
   useEffect(() => {
    setFilteredPersons(persons);  // 更新 filteredPersons 以反映 persons 的最新状态
  }, [persons]);

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

    PersonHttp.create(nameObject)
    .then(result => {
      let personList = persons.concat(result)
      setPersons(personList)
      setNewName('')
      setNewNumber('')
    })
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