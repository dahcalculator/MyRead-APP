import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

export default class  Dashboard extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }
   
    componentDidMount() {
        BooksAPI.getAll()
            .then(resp => {
                this.setState({ books: resp });
            });   
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
        <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <div>
                    <Shelf updateBook={this.updateBook} name="Currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")} />
                    <Shelf updateBook={this.updateBook} name="Want To Read" books={this.state.books.filter(b => b.shelf === "wantToRead")} />
                    <Shelf updateBook={this.updateBook} name="Read" books={this.state.books.filter(b => b.shelf === "read")} />
                    
                    
            
        
             </div>
            </div> 
            <div className="open-search">
              <Link to="/search"><button>Add a book</button></Link>
            </div>
            </div>
        
       
        )
    }
}
