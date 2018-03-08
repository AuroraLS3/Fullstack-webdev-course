import React from 'react'

import { Container, Row, Col } from 'reactstrap'

const About = () => (
    <Container>
        <Row>
            <Col md={8}>
                <h2>About anecdote app</h2>
                <p>According to Wikipedia:</p>

                <em>An anecdote is a brief, revealing account of an individual person or an incident.
                  Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
                  such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."</em>

                <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
            </Col>
            <Col md={4}>
                <img style={{ width: '100%' }} alt="Edsger Dijkstra" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/800px-Edsger_Wybe_Dijkstra.jpg"></img>
                <p>Edsger Dijkstra</p>
            </Col>
        </Row>
    </Container>
)

export default About