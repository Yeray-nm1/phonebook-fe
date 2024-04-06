import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    if (newName === '' || newNumber === '') {
      alert('Name or number is missing')
      return
    }
    if (persons.some(person => person.name.split(' ').join('').toLowerCase().includes(newName.split(' ').join('').toLowerCase()))) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        personsService.update(person.id, personObject).then((returnedPerson) => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setMessage(`Updated ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(error => {
          setMessage(error.response.data.error)
          setError(true)
          setTimeout(() => {
            setMessage(null)
            setError(false)
          }, 5000)
        })
        setNewName('')
        setNewNumber('')
      }
      return
    }
    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setMessage(`Added ${returnedPerson.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }).catch(error => {
      setMessage(error.response.data.error)
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    })
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const [filterWord, setFilterWord] = useState('')
  const handleFilter = (event) => {
    const newCharacter = event.target.value
    setFilterWord(newCharacter)
    if (newCharacter === '') {
      personsService.getAll().then((initialPersons) => {
        setPersons(initialPersons)
      })
    } else {
      personsService.getAll().then((initialPersons) => {
        setPersons(initialPersons.filter(person => person.name.toLowerCase().includes(newCharacter.toLowerCase())))
      })
    }
  }

  const handleRemovePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(id).then(() => {
        personsService.getAll().then((initialPersons) => {
          setPersons(initialPersons)
          setMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filterWord={filterWord} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <AddPersonForm newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} handleRemovePerson={handleRemovePerson} />
    </div>
  )
}

export default App