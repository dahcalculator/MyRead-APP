import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import BookList from './BookList'

export class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchedBook: [],
      error: false,
      query: "",
    }


  }
  
  componentDidMount() {
    BooksAPI.getAll()
      .then(resp => {
        this.setState({ books: resp })
      });
  }

  updateSearchQuery(query) {
    this.setState({ query: query },
      this.onSubmitSearchQuery);
  }

  onSubmitSearchQuery() {
    if (this.state.query) {
      BooksAPI.search(this.state.query.trim())
        .then((searchedBook) => {
          if (!searchedBook || searchedBook.error) {
            this.setState({ searchedBook: [], error: true });
          } else {
            if (searchedBook[0]) {
              this.state.books.forEach((b) => {
                this.state.searchedBook.forEach((s) => {
                  if (b.id === s.id) {
                    s.shelf = b.shelf
                  };
                  
                });
              });
              
            }
            this.setState({ searchedBook: searchedBook });
          } 
        });
    } else {
      this.setState({searchedBook: []})
    }
   }
   
      


  
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
        .then(resp => {
            book.shelf = shelf;
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat({...book, shelf} )
            }));
        });
 }

  render() {
  
  
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search" > Close </button>
            </Link>
            <div className="search-books-input-wrapper">
               
              <input type="text" placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateSearchQuery(event.target.value)}
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                this.state.searchedBook.map((book, key) => <BookList updateBook={this.updateBook} key={key} book={book} />)
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}
export default SearchPage
