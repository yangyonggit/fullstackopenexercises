import { useState } from 'react'

const Persons = (props) => {
  const { persons } = props;
  return (
    <div>
      {persons.map(person => <p key={person.name}>{person.name}   {person.number}</p>)}
    </div>
    );
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

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
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const hanleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={hanleNumberChange
        }/></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />

      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App