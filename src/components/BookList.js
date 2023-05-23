import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      publicationYear
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (id) => {
    deleteBook({ variables: { id } })
      .then(() => {
        console.log('Book deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting book', error);
      });
  };

  return (
    <div>
      <h2>Book List</h2>
      {data.books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Publication Year: {book.publicationYear}</p>
          <button onClick={() => handleDelete(book.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default BookList;
