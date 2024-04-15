import { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const updateAverage = (props) => {
    const {newGood, newBad,newTotal} = props;
    if (newTotal === 0) 
      setAverage(0);
    else
      setAverage((newGood - newBad) / newTotal);
  }

  const updatePositive = (props) => {
    const {newGood, newTotal} = props;    
    if (newTotal === 0)
      setPositive(0);
    else
      setPositive((newGood / newTotal) * 100);
  }

  const updateStatistics = (newGood,newNeutral,newBad) => {
    // console.log(newGood,newNeutral,newBad);
    let newTotal = newGood + newNeutral + newBad;    
    setTotal(newTotal);
    updateAverage({newGood, newBad,newTotal});
    updatePositive({newGood, newTotal});
  } 


  const handleGoodClick = () => {
    let newGood = good + 1;
    setGood(newGood);
    updateStatistics(newGood,neutral,bad);
  }

  const handleNeutralClick = () => {
    let newNeutral = neutral + 1;
    setNeutral(newNeutral);
    updateStatistics(good,newNeutral,bad);
  }

  const handleBadClick = () => {
    let newBad = bad + 1;
    setBad(newBad);
    updateStatistics(good,neutral,newBad);
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
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </div>
    </div>
  )
}

export default App