import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookList from '../BookList'
import * as BooksAPI from '../../BooksAPI'

export class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ""
    }
  }

  
  componentDidMount() {
    BooksAPI.getAll()
      .then(resp => {
        this.setState({ books: resp })
      });
  }

  updateQuery = (query) => {
    this.setState({ query: query }, this.submitSearch);
  }

  submitSearch() {
    if (this.state.query === "" || this.state.query === undefined) {
      return this.setState({ results: [] });
    }

    BooksAPI.search(this.state.query.trim())
    .then(res => {
      if (res.error) {
        return this.setState({ results: [] });
      }
      else {
        res.forEach(b => {
          let finding = this.state.books.filter(B => B.id === b.id);
          if (finding[0]) {
            b.shelf = finding[0].shelf ? finding[0].shelf : null;
          }

        });
        return this.setState({ results: res });
      }
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(resp => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat({ book })
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
                onChange={(event) => this.updateQuery(event.target.value)}
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                this.state.results.map((book, key) => <BookList updateBook={this.updateBook} key={key} book={book} />)
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}
export default SearchPage
