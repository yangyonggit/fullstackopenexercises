import { useState } from 'react'


const StatisticsLine = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}



const Statistics = ({good,neutral,bad} ) => {
  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positivePercentage = total ? (good / total) * 100 : 0;


  return (
      <div>
        {total === 0 ? (<p>No feedback given</p> ):( 
        <table>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positivePercentage} />
        </table>
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