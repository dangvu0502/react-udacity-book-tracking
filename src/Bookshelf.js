import React, { Component } from "react";
import Book from "./Book";


class Bookshelf extends Component {
  state = {
    title: {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read",
    },
  };

  render() {
    const booksOnThisShelf = this.props.books.filter((book) => this.props.BookIDsOnThisShelf.indexOf(book.id) !== -1);

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.state.title[this.props.type]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {booksOnThisShelf.map((book) => (
              <li>
              <Book
                key={book.id}
                book={book}
                handleMove={this.props.handleMove}
              />
              </li>
            ))}

          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
