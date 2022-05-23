import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

class SearchBooks extends Component {

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
{/* {-------------------------------- ERROR HERE -----------------------------------------------------------------   }  */}
          {/* <Link to="/" className="close-search">
            Close
          </Link> */}
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/RusPosevkin/book-tracking/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <Book
                key={book.id}
                book={book}
                handleMove={this.props.handleMove}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
