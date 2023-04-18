import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Statistics = ({good, neutral, bad, all}) => {
    return (all === 0 
        ?
            <>
                <p>
                    No Feetback Given
                </p>
            </> 
        :
            <>
                <table>
                    <StatisticLine text="Good" value ={good} />
                    <StatisticLine text="Neutral" value ={neutral} />
                    <StatisticLine text="Bad" value ={bad} />
                    <StatisticLine text="All" value ={all} />
                    <StatisticLine text="Average" value ={(good - bad) / all} />
                    <StatisticLine text="Positive %" value ={good * 100 / all} />
                </table>
            </>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ({handle, text}) => {
    return <button onClick={handle}>{text}</button>;
};

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    
    const handleGood = () => {
        setGood(good + 1)
        setAll(all + 1)
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
    }
    const handleBad = () => {
        setBad(bad + 1)
        setAll(all + 1)
    }

    return (
        <>
            <h1>Give Feetback</h1>
            <Button handle={handleGood} text={'Good'} />
            <Button handle={handleNeutral} text={'Neutral'} />
            <Button handle={handleBad} text={'Bad'} />
            <h1>Statics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} all={all} />
        </>
    )
}

root.render(<App />);
