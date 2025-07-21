import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from 'react-bootstrap';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
  });

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewBookId, setReviewBookId] = useState(null);
  const [reviewData, setReviewData] = useState({
    reviewerName: '',
    comment: '',
  });

  // Fetch books on load
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch('http://localhost:5000/books');
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
  };

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateBook = async (e) => {
    e.preventDefault();

    if (!newBook.title || !newBook.author || !newBook.description) return;

    try {
      const url = editMode
        ? `http://localhost:5000/books/${currentBookId}`
        : 'http://localhost:5000/books';
      const method = editMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Error:', data.message || data);
        return;
      }

      setBooks((prev) =>
        editMode
          ? prev.map((b) => (b._id === currentBookId ? data : b))
          : [...prev, data]
      );

      setNewBook({ title: '', author: '', description: '' });
      setShowModal(false);
      setEditMode(false);
      setCurrentBookId(null);
    } catch (error) {
      console.error('Error submitting book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      const res = await fetch(`http://localhost:5000/books/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBooks((prev) => prev.filter((b) => b._id !== id));
      } else {
        const errData = await res.json();
        console.error('Delete failed:', errData.message);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleUpdateBook = (book) => {
    setEditMode(true);
    setCurrentBookId(book._id);
    setNewBook({
      title: book.title,
      author: book.author,
      description: book.description,
    });
    setShowModal(true);
  };

  // Review modal handlers
  const openReviewModal = (bookId) => {
    setReviewBookId(bookId);
    setReviewData({ reviewerName: '', comment: '' });
    setShowReviewModal(true);
  };

  const handleReviewChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!reviewData.reviewerName || !reviewData.comment) return;

    try {
      const res = await fetch(`http://localhost:5000/reviews/${reviewBookId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error('Review submission failed:', result.message);
        return;
      }

      setShowReviewModal(false);
      alert('Review submitted!');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Book Review App</h2>
        <Button
          variant="success"
          onClick={() => {
            setEditMode(false);
            setNewBook({ title: '', author: '', description: '' });
            setShowModal(true);
          }}
        >
          + Add Book
        </Button>
      </div>

      {books.length === 0 ? (
        <p className="text-muted">No books added yet.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {books.map((book) => (
            <Col key={book._id}>
              <Card className="h-100 shadow-sm rounded-4">
                <Card.Body>
                  <Card.Title className="fw-semibold">{book.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    by {book.author}
                  </Card.Subtitle>
                  <Card.Text>{book.description}</Card.Text>
                  <div className="d-flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleUpdateBook(book)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteBook(book._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => openReviewModal(book._id)}
                    >
                      Review
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Add/Edit Book Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Update Book' : 'Add a New Book'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddOrUpdateBook}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleChange}
                required
                placeholder="Enter book title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleChange}
                required
                placeholder="Enter author's name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newBook.description}
                onChange={handleChange}
                required
                placeholder="Enter description"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editMode ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Review Modal */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submit a Review</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitReview}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="reviewerName"
                value={reviewData.reviewerName}
                onChange={handleReviewChange}
                required
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                value={reviewData.comment}
                onChange={handleReviewChange}
                required
                placeholder="Write your thoughts..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit Review
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Home;
