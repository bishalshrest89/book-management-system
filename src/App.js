import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './config';

import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Book Management System</h1>
        <BookList />
        <AddBookForm />
      </div>
    </ApolloProvider>
  );
}

export default App;
