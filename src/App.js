import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard'
import SearchPage from './components/pages/SearchPage'


class BooksApp extends React.Component {
  render() {

    return (
      <div>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/search" component={SearchPage} />
      </div>
     
    )
  }
}

export default BooksApp
