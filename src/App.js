import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import './App.css'


class BooksApp extends React.Component {
  
  state = {
    books: [],
    shelfTypes: ['currentlyReading', 'wantToRead', 'read'],
    showSearchPage: false
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => (
      this.setState({books: books})
    ))
  }
 

  render() {
    if(this.state.books.length === 0) {
        return (
          <div className="app">
            <span>Loading...</span>
          </div>
        )
    }

    return (
        <div className="app">
          { 
          this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
          ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf key={1} books={this.state.books.slice(0,3)} type={this.state.shelfTypes[0]}/>
                  <Bookshelf key={2} books={this.state.books.slice(3,6)} type={this.state.shelfTypes[1]}/>
                  <Bookshelf key={3} books={this.state.books.slice(6,9)} type={this.state.shelfTypes[2]}/>
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )}
        </div>
      )
    
  }
}

export default BooksApp
