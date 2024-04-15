import { useState } from 'react'


const Statistics = ({good,neutral,bad} ) => {
  // const [total, setTotal] = useState(0)
  // const [average, setAverage] = useState(0)
  // const [positive, setPositive] = useState(0)

  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positivePercentage = total ? (good / total) * 100 : 0;


  return (
      <div>
        {total === 0 ? (<p>No feedback given</p> ):( 
        <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {average}</p>
        <p>positive {positivePercentage} %</p>
        </>
        )}        
      </div>    
  );
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);    
  }

  const handleNeutralClick = () => {    
    setNeutral(neutral + 1);    
  }

  const handleBadClick = () => {    
    setBad(bad + 1);    
  }

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <button onClick={handleGoodClick}>good</button>         
        <button onClick={handleNeutralClick}>neutral</button>        
        <button onClick={handleBadClick}>bad</button>
      </div>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App