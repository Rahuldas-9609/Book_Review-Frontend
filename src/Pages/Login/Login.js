import React, { useState } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  InputGroup
} from 'react-bootstrap';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="shadow-sm rounded-4">
            <Card.Body>
              <h3 className="mb-4 text-center fw-bold text-primary">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <InputGroup.Text
                      onClick={togglePasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    >
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" type="submit" className="w-100 fw-semibold">
                    Login
                  </Button>
                </div>
                <p className="text-center mt-3 small">
                  Don't have an account? <a href="/Sign-up">Sign Up</a>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
