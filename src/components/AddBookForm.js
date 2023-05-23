import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!, $publicationYear: Int!) {
    createBook(title: $title, author: $author, publicationYear: $publicationYear) {
      id
    }
  }
`;

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [createBook] = useMutation(CREATE_BOOK);

  const handleSubmit = (e) => {
    e.preventDefault();
    createBook({ variables: { title, author, publicationYear: parseInt(publicationYear) } })
      .then(() => {
        console.log('Book created successfully');
        setTitle('');
        setAuthor('');
        setPublicationYear('');
      })
      .catch((error) => {
        console.error('Error creating book', error);
      });
  };

  return (
    <div>
      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Publication Year"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBookForm;
