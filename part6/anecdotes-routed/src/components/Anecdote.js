import React from 'react'

import { Container } from 'reactstrap'

const Anecdote = ({ anecdote }) => (
    <Container>
        <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>For more info see <a target="_blank" href={anecdote.info}>{anecdote.info}</a></p>
    </Container>
)

export default Anecdote