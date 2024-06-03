import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const Display = props => {
  return <h1>{props.text}</h1>
}
const Statistics = (props) => {

  return(
  <div>
    <h2>Statistics</h2>
    <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td>{props.goodCount}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{props.neutralCount}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{props.badCount}</td>
        </tr>
      </tbody>
    </table>
  
  </div>
  )
};
const History = (props) => {
  return (
    <p> all {props.changeHistory.length}</p>
  )
}

const Average = (props) => {
  
  const total = props.goodCount + props.neutralCount + props.badCount
  const average = total > 0 ? (props.goodCount - props.badCount) / total : 0;
  const positivePercentage = total > 0 ? (props.goodCount / total) * 100 : 0

  return (
    
    <div>
    <p>average {average}</p>
    <p>positive feedback: {positivePercentage}%</p>
    </div>
  )
}
const App = () => {
  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [badCount, setBadCount] = useState(0)
  const [changeHistory, setChangeHistory] = useState([])


  const handleGoodClick = () => {
    setGoodCount(goodCount+1)
    setChangeHistory(changeHistory.concat('G'))
  }
  const handleNeutralClick = () => {
    setNeutralCount(neutralCount+1)
    setChangeHistory(changeHistory.concat('N'))
  }
  const handleBadClick = () => {
    setBadCount(badCount+1)
    setChangeHistory(changeHistory.concat('B'))

  }
  return (
    <div>
      <Display text = 'give feedback'/>
      <button onClick = {handleGoodClick}>good {goodCount}</button>
      <button onClick = {handleNeutralClick}>neutral {neutralCount}</button>
      <button onClick = {handleBadClick}>bad {badCount}</button>
      {changeHistory.length > 0 ? (
        <>
        <Statistics goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}/>
        <History changeHistory = {changeHistory.length}/>
        <Average goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}/>
        </>
      ): (
        <div><h2>No feedback given</h2></div>
      )}
    </div>
  )
}

export default App
