import React from 'react'

const Anecdote = ({ anecdote }) => (
    <div>
        <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>For more info see <a target="_blank" href={anecdote.info}>{anecdote.info}</a></p>
    </div>
)

export default Anecdote