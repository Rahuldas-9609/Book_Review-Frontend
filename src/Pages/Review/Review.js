import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from 'react-bootstrap';

const ReviewPage = () => {
  const [books, setBooks] = useState([]);
  const [newReviews, setNewReviews] = useState({}); // { bookId: { reviewerName: '', comment: '' } }

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch('http://localhost:5000/books',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching books:', err);
      setBooks([]);
    }
  };

  const handleInputChange = (e, bookId) => {
    const { name, value } = e.target;
    setNewReviews((prev) => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [name]: value,
      },
    }));
  };

  const handleSubmitReview = async (e, bookId) => {
    e.preventDefault();
    const review = newReviews[bookId];

    if (!review?.reviewerName || !review?.comment) return;

    try {
      const res = await fetch('http://localhost:5000/books/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...review, bookId }),
      });

      if (res.ok) {
        await fetchBooks(); // Refresh books with new review
        setNewReviews((prev) => ({ ...prev, [bookId]: { reviewerName: '', comment: '' } }));
      } else {
        const errorData = await res.json();
        console.error('Review submission failed:', errorData.message);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-primary mb-4">Book Reviews</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {books.map((book) => (
          <Col key={book._id}>
            <Card className="shadow-sm rounded-4 h-100">
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">by {book.author}</Card.Subtitle>
                <Card.Text>{book.description}</Card.Text>

                <h6 className="mt-4">Reviews:</h6>
                {book.reviews && book.reviews.length > 0 ? (
                  <ListGroup variant="flush" className="mb-3">
                    {book.reviews.map((review, idx) => (
                      <ListGroup.Item key={idx}>
                        <strong>{review.reviewerName}</strong>: {review.comment}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className="text-muted">No reviews yet.</p>
                )}

                <Form onSubmit={(e) => handleSubmitReview(e, book._id)}>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      name="reviewerName"
                      value={newReviews[book._id]?.reviewerName || ''}
                      onChange={(e) => handleInputChange(e, book._id)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Write your review..."
                      name="comment"
                      value={newReviews[book._id]?.comment || ''}
                      onChange={(e) => handleInputChange(e, book._id)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" size="sm">
                    Submit Review
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReviewPage;
