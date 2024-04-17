import { useState, useEffect} from 'react'
import {Filter, PersonForm, Persons, Notification, ErrorMsg } from './PersonComp'
import PersonHttp from './PersonHttp'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [search, setSearch] = useState('')

  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [message, setMessage] = useState(null)

  const [errorMsg, setErrorMsg] = useState(null)


  
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
    const person = persons.find(person => person.name === newName)
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {  
        PersonHttp.update(person.id,nameObject).then(result => {
          const newPersons = persons.map(p => p.id !== person.id ? p : result);
          setPersons(newPersons);
          setNewName('');
          setNewNumber('');
          setMessage(`Updated ${newName}`);
          setTimeout(() => {
            setMessage(null);
          },5000);
        }).catch(error => {
          setErrorMsg(`Information of ${newName} has already been removed from server`);
          setTimeout(() => {
            setErrorMsg(null);
          },5000);
          setPersons(persons.filter(p => p.id !== person.id));
        
        })
      }
      return;
    }

    PersonHttp.create(nameObject)
    .then(result => {
      let personList = persons.concat(result)
      setPersons(personList)
      setNewName('')
      setNewNumber('')
      setMessage(`Added ${newName}`);
      setTimeout(() => {
        setMessage(null);
      },5000);
    }).catch(error => {
      setErrorMsg(`Information of ${newName} has already been removed from server`);
      setTimeout(() => {
        setErrorMsg(null);
      },5000);
      setPersons(persons.filter(p => p.id !== person.id));
    
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
      {message && <Notification message={message} />}
      {errorMsg && <ErrorMsg message={errorMsg} />}
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
      <Persons persons={filteredPersons} setPersons={setPersons} setErrorMsg={setErrorMsg}/>

      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App