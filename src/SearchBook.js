import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {
  state = {
    searchBooks: [],
  };

  search = (searchTerm) => {
    if (searchTerm) {
      BooksAPI.search(searchTerm).then((books) => {
        this.setState({
          searchBooks: books === undefined || books.error ? [] : books,
        });
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  };

  render() {
    // put book on right shelf
    // if book haven't been not on shelf yet.
    // set book.shelf to none
    const searchBooksOnRightShelf = this.state.searchBooks.map((searchBook) => {
      const intersectedBook = this.props.books.find((book) => {
        return book.id === searchBook.id;
      });
      searchBook.shelf = intersectedBook ? intersectedBook.shelf : "none";
      return searchBook;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/RusPosevkin/book-tracking/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.search(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBooksOnRightShelf.map((book, index) => (
              <li key={`book-${index}`}>
                <Book
                  key={book.id}
                  book={book}
                  handleMove={this.props.handleMoveWhenSearching}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
