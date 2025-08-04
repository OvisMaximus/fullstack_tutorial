import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Header = ({ headerText }) => (<div><h1>{headerText}</h1></div>)

const StatisticLine = ({ text, value }) => (
    <tr><td>{text}:</td><td>{value}</td></tr>
)

const Statistics = ({ good, neutral, bad }) => {
    const content = good + neutral + bad === 0 ? (<div>No feedback given</div>)
        :(
            <div>
                <table>
                    <tbody>
                        <StatisticLine text='good' value={good}/>
                        <StatisticLine text='neutral' value={neutral}/>
                        <StatisticLine text='bad' value={bad}/>
                        <StatisticLine text='average' value={(good - bad) / (good + neutral + bad)}/>
                        <StatisticLine text='positive' value={(good / (good + neutral + bad)) * 100 + '%'}/>
                    </tbody>
                </table>
            </div>
        )
    return (
        <div>
            <Header headerText='statistics'/>
            {content}
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <div>
                <Header headerText='give feedback'/>
                <Button onClick={() => setGood(good + 1)} text='good'/>
                <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
                <Button onClick={() => setBad(bad + 1)} text='bad'/>
            </div>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App