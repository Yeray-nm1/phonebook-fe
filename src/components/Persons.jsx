const Persons = ({ persons, handleRemovePerson }) => {
  return (
    <div>
      {
      persons.map(person => 
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleRemovePerson(person.id)}>delete</button>
        </div>
        )
      }
    </div>
  )
}

export default Persons