import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal
} from 'react-bootstrap';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: ''
  });

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (newBook.title && newBook.author && newBook.description) {
      setBooks([...books, newBook]);
      setNewBook({ title: '', author: '', description: '' });
      setShowModal(false);
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Book Review App</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          + Add Book
        </Button>
      </div>

      {books.length === 0 ? (
        <p className="text-muted">No books added yet. Click "Add Book" to begin.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {books.map((book, idx) => (
            <Col key={idx}>
              <Card className="h-100 shadow-sm rounded-4">
                <Card.Body>
                  <Card.Title className="fw-semibold">{book.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">by {book.author}</Card.Subtitle>
                  <Card.Text>{book.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Add Book Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Book</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddBook}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book title"
                name="title"
                value={newBook.title}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author's name"
                name="author"
                value={newBook.author}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={newBook.description}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Book
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Home;

