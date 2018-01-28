import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: [0, 0, 0, 0, 0, 0]
        }
    }

    random() {
        return Math.floor(Math.random() * (anecdotes.length))
    }

    next = () => {
        return () => {
            const value = this.random()
            this.setState({ selected: value })
        }
    }

    vote = () => {
        return () => {
            const currentSelection = this.state.selected
            const newVotes = [...this.state.votes]
            newVotes[currentSelection] += 1
            this.setState({ votes: newVotes })
        }
    }

    bestAnecdote = () => {
        const votes = this.state.votes
        let indx = 0
        let max = votes[0]
        for (let i = 0; i < votes.length; i++) {
            if (votes[i] > max) {
                max = votes[i]
                indx = i
            }
        }
        return indx
    }

    render() {
        const sel = this.state.selected
        const bestAnecdote = this.bestAnecdote()
        return (
            <div>
                <p>{this.props.anecdotes[sel]}</p>
                <Votes voteCount={this.state.votes[sel]} />
                <button onClick={this.next()}>Random Anecdote</button>
                <button onClick={this.vote()}>Vote</button>
                <MostVoted anecdote={this.props.anecdotes[bestAnecdote]} count={this.state.votes[bestAnecdote]} />
            </div>
        )
    }
}

const Votes = (props) => {
    return <p>Votes: {props.voteCount}</p>
}

const MostVoted = (props) => {
    return <div>
        <h1>Best Anecdote</h1>
        <p>{props.anecdote}</p>
        <p>Has {props.count} votes.</p>
    </div>
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)