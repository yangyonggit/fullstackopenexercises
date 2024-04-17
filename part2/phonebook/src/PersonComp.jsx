import PersonHttp from "./PersonHttp"

const Persons = (props) => {
    const { persons,setPersons, handleError} = props;

    const handleDelete = (event) => {
      const id = event.target.dataset.id;
      const name = event.target.dataset.name;
      if (window.confirm(`Delete ${name}?`)) {  
        PersonHttp.deletePerson(id).then(result => {
          const newPersons = persons.filter(person => person.id !== id);
          setPersons(newPersons);          
        }).catch(() => handleError(id,name));        
      }
    }
  
    console.log('Persons ', persons);
    return (
      <div>
        {          
          persons.map(person =>             
          <div style={{display: 'flex', alignItems: 'center' }} key={person.id}>
          <p>{person.name}   {person.number}</p> 
          <button onClick={handleDelete} data-id = {person.id} data-name={person.name}>delete</button> 
          </div>)
        }
      
      </div>
      );
  }
  
  const Filter = (props) => {
    const {search,handleSearchChange} = props;
    return (
      <div>
        <p>filter shown with</p>
        <input 
          type="text" 
          value={search} 
          onChange={handleSearchChange} 
          placeholder="Search names..."
        />
      </div>
    );
  }
  
  const PersonForm = (props) => {
    const {newName, handleNameChange, newNumber, handleNumberChange, addName} = props;
    return (
      <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>number: <input value={newNumber} onChange={handleNumberChange
      }/></div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
    );
  }

  const Notification = (props) => {
    const {message} = props;
    const notificationStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16,
      border: '2px solid green',
      backgroundColor: 'lightgrey',
      padding: '10px',
      marginBottom: '10px'
    }

    return (      
      <p style={notificationStyle}>{message}</p>      
    );
  }

  const ErrorMsg = (props) => {
    const {message} = props;
    const errorStyle = {
      color: 'red',
      fontStyle: 'italic',
      fontSize: 16,
      border: '2px solid red',
      backgroundColor: 'lightgrey',
      padding: '10px',
      marginBottom: '10px'
    }

    return (      
      <p style={errorStyle}>{message}</p>      
    );
  }


  export {Persons, Filter, PersonForm, Notification,ErrorMsg}