import React, { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import AddPersonForm from './components/AddPersonForm'
import ContactList from './components/ContactList'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [message, setMessage] = useState(null)
  const [messageQuality, setMessageQuality] = useState('')

  useEffect(() => {
    console.log('initial load effect')
    personService.getAll()
    .then(initialPersons => {
      console.log('loaded', initialPersons)
      setPersons(initialPersons)
    }) 
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNameFormChange = (event) => {
    console.log('handleNameFormChange', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberFormChange = (event) => {
    console.log('handleNumberFormChange', event.target.value)
    setNewNumber(event.target.value)
  }  
  
  const handleFilterFormChange = (event) => {
    console.log('handleFilterFormChange', event.target.value)
    setFilterValue(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().startsWith(filterValue.toLowerCase()))

  const showMessage = (message, messageQuality) => {
    setMessage(message)
    setMessageQuality(messageQuality)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
    
  const addFunctionality = (event) => {
    event.preventDefault()
    console.log('add button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log('adding or updating person', personObject)

    if (!(persons.map((person) => person.name).includes(newName))) {
      addPerson (personObject)
    } else if (window.confirm(`${newName} is already added to phonebook. Replace the existing number with a new one?`)) {
      const personToUpdate = persons.find(person => person.name===newName)
      updateNumber(personToUpdate.id, newNumber)
    }
  }

  const addPerson = (personObject) => {
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setFilterValue('')
        console.log('added', returnedPerson)
        showMessage(`Added ${returnedPerson.name}`, 'success')
      })
      .catch(error => {
        showMessage(error.response.data.error, 'error')
      })
  }

  const updateNumber = (id, newNumber) => {
    const personToUpdate = persons.find(person => person.id===id)
    const updatedPerson = { ...personToUpdate, number: newNumber}
     console.log(`updating ${personToUpdate.name}'s number`)

    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        if (!returnedPerson) {throw new Error('person does not exist')}
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        setFilterValue('')
        showMessage(`Updated ${returnedPerson.name}'s number`, 'success')
      })
      .catch(error => {
        if (error.response) {
          showMessage(error.response.data.error, 'error') 
        } else {
          console.log(error)
          showMessage(`Cannot update, ${personToUpdate.name} does not exist in your phonebook`, 'error')
          setPersons(persons.filter(person => person.id !== id))
        }
      })
  }
  
  const removePerson = (id) => {
    const personToRemove = persons.find(p => p.id===id)
    const removedName = personToRemove.name
    console.log('remove ', removedName)
    if (window.confirm(`Confirm deletion of ${personToRemove.name}.`)) {
      console.log(`removing person with id ${id}`)
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => 
            person.id !== id))
          showMessage(`Removed ${removedName}`, 'success')
        })
        .catch(error => {
          showMessage(`${personToRemove.name} does not exist in your phonebook`, 'error')
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} quality={messageQuality}/>
      <FilterForm 
        value={filterValue} 
        onChange={handleFilterFormChange}
      />
      <AddPersonForm 
        onSubmitValue={addFunctionality}
        nameValue={newName}
        nameOnChange={handleNameFormChange}
        numberValue={newNumber} 
        numberOnChange={handleNumberFormChange}
      />
      <ContactList personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App