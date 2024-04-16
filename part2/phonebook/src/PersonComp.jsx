
const Persons = (props) => {
    const { persons } = props;
    return (
      <div>
        {persons.map(person => <p key={person.name}>{person.name}   {person.number}</p>)}
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

  export {Persons, Filter, PersonForm}