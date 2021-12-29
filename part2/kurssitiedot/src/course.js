import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const execise_array= course.parts.map(parts => parts.exercises)
    
    const sum = execise_array.reduce((previousValue, currentValue) => previousValue + currentValue)
  
    return(
      <p><b>Number of exercises {sum} </b></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(prt => <Part key={prt.id} part={prt} />)}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total course={course} />
      </div>
    )
    
  }

export default Course
  