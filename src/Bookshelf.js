import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends Component {


  state = {
    title: {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want to Read',
      read: 'Read',
    }
  }

  render() {
    const booksInShelf = this.props.books;

    if (booksInShelf.length === 0) {
      return null;
    }

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.state.title[this.props.type]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksInShelf.map((book) => (
              <Book
                key={book.id}
                book={book}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
};

export default Bookshelf;