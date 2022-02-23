import { useState } from 'react'

//random int generator
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const Button = ({ text, handleClick }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [counter, setCounter] = useState(() => new Array(7).fill(0))

    let Random_number = 0

    const Generate_anecdote = () => {
        Random_number = getRandomInt(7)
        console.log('Cau cham ngon so', Random_number + 1)
        setSelected(Random_number)
    }

    const Vote_anecdote = () => {
        const copy = [...counter]
        copy[selected]++
        console.log('So vote', copy[Random_number])
        setCounter(copy)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {counter[selected]} votes</p>

            <Button text={'vote'} handleClick={Vote_anecdote} />
            <Button text={'next anecdote'} handleClick={Generate_anecdote} />

            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[counter.indexOf(Math.max(...counter))]}</p>
        </div>
    )
}

export default App