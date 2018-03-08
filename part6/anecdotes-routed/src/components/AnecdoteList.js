import React from 'react'
import { Link } from 'react-router-dom'

import { ListGroup, ListGroupItem } from 'reactstrap'

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ListGroup>
            {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></ListGroupItem>)}
        </ListGroup>
    </div>
)

export default AnecdoteList