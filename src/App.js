import React from "react";
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./Bookshelf";
import SearchBooks from "./SearchBook";
import "./App.css";
import { Route, Link, Routes } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfTypes: ["currentlyReading", "wantToRead", "read"],
    bookShelves: {},
  };

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      const bookShelves = this.state.shelfTypes.reduce((shelf, shelfType) => {
        shelf[shelfType] = books
          .filter((book) => book.shelf === shelfType)
          .map((book) => book.id);
        return shelf;
      }, {});
      this.setState({ books, bookShelves });
    });
  };

  componentDidMount = () => {
    this.getAllBooks();
  };

  handleMove = (book, shelf) => {
    BooksAPI.update(book, shelf).then((bookShelves) => {
      book.shelf = shelf;
      this.setState({ bookShelves });
    });
  };

  render() {
    if (this.state.books.length === 0) {
      return (
        <div className="app">
          <span>Loading...</span>
        </div>
      );
    }

    return (
      <div className="app">
        <Routes>
          <Route
            exact
            path="/search"
// {----------------------------SOMETHING WRONG HERE ----------------------------}            
            // render={() => (
            //   <SearchBooks
            //     books={this.state.books}
            //     handleMove={this.handleMove}
            //   />
            // )}
            element = {<SearchBooks
                  books={this.state.books}
                  handleMove={this.handleMove}
                />}
          />
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <Bookshelf
                      key={this.state.shelfTypes[0]}
                      books={this.state.books}
                      type={this.state.shelfTypes[0]}
                      BookIDsOnThisShelf={
                        this.state.bookShelves[this.state.shelfTypes[0]]
                      }
                      handleMove={this.handleMove}
                    />
                    <Bookshelf
                      key={this.state.shelfTypes[1]}
                      books={this.state.books}
                      type={this.state.shelfTypes[1]}
                      BookIDsOnThisShelf={
                        this.state.bookShelves[this.state.shelfTypes[1]]
                      }
                      handleMove={this.handleMove}
                    />
                    <Bookshelf
                      key={this.state.shelfTypes[2]}
                      books={this.state.books}
                      type={this.state.shelfTypes[2]}
                      BookIDsOnThisShelf={
                        this.state.bookShelves[this.state.shelfTypes[2]]
                      }
                      handleMove={this.handleMove}
                    />
                  </div>
                </div>
                <Link to="/search" className="open-search">
                  Add a book
                </Link>
              </div>
            )}
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
