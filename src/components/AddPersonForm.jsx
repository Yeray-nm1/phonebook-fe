const AddPersonForm = ({ newName, handlePersonChange, newNumber, handleNumberChange, addPerson }) => {
  return (
    <form>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
  )
}

export default AddPersonForm