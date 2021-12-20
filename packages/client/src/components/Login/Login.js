import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

export default function Login() {
  function handleFormSubmit() {

  }

  return (
      <Container>
        <h1>Tutorverse</h1>
        <h5>Where Learning Transpires!</h5>
        <Row>
          <Col className='first'
            md={{ span: 4, offset: 4 }}>
            <Form>
              <Form.Group className='user-email' controlId='formLogInEmail'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Email...' />
              </Form.Group>
              <Form.Group className='user-password' controlId='formLogInPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password...'/>
              </Form.Group>
              <Button variant="primary" type='submit'>Log In</Button>
            </Form>
          </Col>
        </Row>
      </Container>
  )
}
