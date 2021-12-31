import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Person = ({person, deleteFunc}) => {
  return (
    <div>
        <p> {person.name} {person.number} <button onClick={() => deleteFunc(person)}>delete</button></p>
    </div>
  )
}

const Filter = ({filter, onchangeFunc}) => {
  return (
    <div>
      filter show with: <input value={filter} onChange={onchangeFunc}/>
    </div>
  )
}

const PersonForm = ({submitfunc, name, nameChgFunc, number, numberChgfunc}) => {
  return(
    <div>
      <form onSubmit={submitfunc}>
        <div> name: <input value={name} onChange={nameChgFunc}/></div>
        <div> number: <input value={number} onChange={numberChgfunc}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({persons, filter, deleteFunc}) => {

  return (
    <div>
      {persons.filter(person => person.name.toLocaleUpperCase().includes(filter.toUpperCase()))
        .map(person => <Person key={person.name} person={person} deleteFunc={deleteFunc}/>)}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null || message ==='') {
    return null
  }
  return (
    <div className='success'>
      {message}
    </div>
  )

}

const ErrorNotification = ({ message }) => {
  if (message === null || message ==='') {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )

}


const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewfilter] = useState('')
  const [successMessage, setsuccessMessage] = useState(null)
  const [errorMessage, seterrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService.getAll().then(response => {
        console.log('promise fulfilled')
        setPersons(response.data) 
      })
  }, [])

  
  const addNumber = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)){
       if (window.confirm(`${newName}is already added to phonebook, replace the old number with a new one?`)) {
        
          personService.updateNumber(persons.filter(person => person.name === newName)[0].id, newName, newNumber)
          .catch(error => {
            seterrorMessage(`Information of ${newName} was already removed from server. Please refresh page`)
            setTimeout(() => {
              seterrorMessage(null)
            }, 5000);
          })
          
          if (errorMessage !== null) {
          const updatedPersons = [...persons]
          updatedPersons[updatedPersons.findIndex((obj=> obj.name ===newName))].number = newNumber
          setPersons(updatedPersons)

          setNewName('')
          setNewNumber('')

          setsuccessMessage(`Updated number for ${newName}`)

          setTimeout(() => {
            setsuccessMessage(null)
          }, 5000)
        }
      }
    }
    else
    {
      const person = {name : newName,
                      number : newNumber
                    , id: persons.length+1}
      setPersons(persons.concat(person))
      
      personService.create(person).then(response => {console.log(response)})

      setNewName('')
      setNewNumber('')
      setsuccessMessage(`Added ${newName}`)

          setTimeout(() => {
            setsuccessMessage(null)
          }, 5000)
    }
  } 

  const deleteNumber = (personToDelete) => {

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
        personService.deleteNumber(personToDelete.id).then(response => {console.log(response)})
        const newPersonsList = persons.filter(person => person.id !== personToDelete.id)
        setPersons(newPersonsList)
    }
  }


  const handleNameAdd = event => setNewName(event.target.value)
  const handleNumberAdd = event => setNewNumber(event.target.value)
  const handleFilter = event => setNewfilter(event.target.value)  

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter filter={filter} onchangeFunc={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm submitfunc={addNumber} name={newName} nameChgFunc={handleNameAdd} 
                  number = {newNumber} numberChgfunc={handleNumberAdd} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteFunc={deleteNumber}/>
    </div>
  )
}

export default App