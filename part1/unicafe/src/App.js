import React, { useState } from 'react'


const StatisticLine = (props) => {
  return (<div> 
              <tr>
                <td>{props.text}</td>
                <td>{props.value}</td>
              </tr>
         </div>)
}

const Button = (props) => {
return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const Average = (good, neutral, bad) => {
  return ((good - bad) / (good + bad + neutral))
}

const Positive = (good, neutral, bad) => {
      return (good / (good + bad + neutral))
}

const Statistics = (props) => {
if (props.good+props.bad+props.neutral!=0) {
      return (
        <div>
          <table>
            <StatisticLine text="good" value = {props.good}/>
            <StatisticLine text="neutral" value = {props.neutral}/>
            <StatisticLine text="bad" value = {props.bad}/>
            <StatisticLine text="average" value={Average(props.good, props.neutral, props.bad)}/>
            <StatisticLine text="positive" value={Average(props.good, props.neutral, props.bad)}/>
          </table>
        </div>
      )      
}
return (<div>
        <p>No feeback Given</p>
      </div>)
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodfeedback = () => setGood(good + 1)
  const handleNeutralfeedback = () => setNeutral(neutral + 1)
  const handleBadfeedback = () => setBad(bad + 1)


return (
    <div>
      <h1> Give Feedback </h1>
      <Button handleClick={handleGoodfeedback} text="good"/>
      <Button handleClick={handleNeutralfeedback} text="neutral"/>
      <Button handleClick={handleBadfeedback} text="bad"/>
      <h1> Statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App