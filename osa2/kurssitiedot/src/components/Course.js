import React from 'react'

const Course = ({ course }) => {
    console.log('Course', course)
    return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Header = ({ course }) => {
    console.log('Header', course)
    return <h2>{course}</h2>
  }
  
  const Content = ({ parts }) => {
    console.log('Content', parts)
    return (
      <div>
        <ul>
         {parts.map(part => 
            <Part key={part.id} part={part} /> 
            )} 
        </ul>
      </div>
    )
  }
  
  const Part = ({ part }) => {
    console.log('Part', part)
    return (
        <li>{part.name}, {part.exercises} exercises</li>
    )
  }
  
  const Total = ({ parts }) => {
    console.log('Total', parts)
    return (
      <p>
        <b>Total number of exercises: {parts.reduce((sum, part) => 
          sum + part.exercises, 0  
        )} </b>
      </p>
    )
  }

  export default Course