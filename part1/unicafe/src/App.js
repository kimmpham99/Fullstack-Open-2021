import { useState } from 'react'

const Header = ({ text }) => {
    return (
        <div>
            <h1>{text}</h1>
        </div>
    )
}

const Button = ({ text, handleClick, handleAllClick }) => {
    return (
        <>
            <button onClick={handleClick}>
                {text}
            </button>
        </>
    )
}

//conditional component
const Display = ({ text, count }) => {
    if (text == 'positive') {
        return (
            <tr>
                <td>{text}</td>
                <td>{count} %</td>
            </tr>
        )
    }

    return (
        <tr>
            <td>{text}</td>
            <td>{count}</td>
        </tr>
    )
}

//conditional component
const Statistics = ({ good, neutral, bad, all }) => {
    if (all == 0) {
        return (
            <div>
                <Header text={'statistic'} />
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <Header text={'statistic'} />
            <table>
                <tbody>
                    <Display text={'good'} count={good} />
                    <Display text={'neutral'} count={neutral} />
                    <Display text={'bad'} count={bad} />
                    <Display text={'all'} count={all} />
                    <Display text={'average'} count={(good * 1 + neutral * 0 + bad * -1) / all} />
                    <Display text={'positive'} count={good / all * 100} />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    //default useState
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    //setState
    const handleGoodClick = () => {
        setGood(good + 1)
        setAll(all + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
        setAll(all + 1)
    }

    return (
        <div>
            <Header text={'give feedback'} />

            <Button text={'good'} handleClick={handleGoodClick} />
            <Button text={'neutral'} handleClick={handleNeutralClick} />
            <Button text={'bad'} handleClick={handleBadClick} />

            <Statistics good={good} neutral={neutral} bad={bad} all={all} />
        </div>
    )
}

export default App