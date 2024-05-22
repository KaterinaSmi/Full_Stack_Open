import { useState } from 'react'



const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name: "Fundamentals of React",
      exercises:10 
    },
    {name: "Using props to pass data",
      exercises:7
    },
    {name: "State of a component",
      exercises:14
    }
  ];
  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  );
};

const Header = ({course}) => {
  return <h1>{course}</h1>;
};

const Content = ({parts}) => {
  const Part = ({name, exercises}) =>{
    return (
      <p>
        {name} {exercises}
      </p>
    );
  };
  return (
    <div>
      {parts.map((part,index)=>( //The map method is called on the parts array. It iterates over each element in the array and applies a function to each element.
        <Part key={index} name={part.name} exercises={part.exercises}/>
      ))} 
    </div>
  );
};
// keys need to be unique, so thats why index is taken, name and exercises are renderen whithin <p> el
const Total = ({parts}) => {
  const total = parts.reduce((sum,part) => sum + part.exercises,0); //initially sets to 0
  return <p>Number of exercises {total}</p>
}


export default App

// tips for me:
// array.reduce((accumulator, currentValue) => {
//   // Perform some operation with accumulator and currentValue
// }, initialValue);