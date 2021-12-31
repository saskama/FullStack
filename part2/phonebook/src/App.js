import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => {
  return (
    <div>
      <li>
        {person.name} {person.number}
      </li>
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

const Persons = ({persons, filter}) => {
  return (
    <div>
      <ul>
      {persons.filter(person => person.name.toLocaleUpperCase().includes(filter.toUpperCase())).map(person => <Person key={person.name} person={person}/>)}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewfilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  
  const addNumber = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)){
       alert(`${newName} is already added to phonebook`)
    }
    else
    {
      const person = {name : newName,
                      number : newNumber}
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  } 

  const handleNameAdd = event => setNewName(event.target.value)
  const handleNumberAdd = event => setNewNumber(event.target.value)
  const handleFilter = event => setNewfilter(event.target.value)  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onchangeFunc={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm submitfunc={addNumber} name={newName} nameChgFunc={handleNameAdd} 
                  number = {newNumber} numberChgfunc={handleNumberAdd} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App