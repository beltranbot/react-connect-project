import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import AuthorList from './components/authors/AuthorList'
import AuthorCreate from './components/authors/AuthorCreate'
import CategoryList from './components/categories/CategoryList'
import CategoryCreate from './components/categories/CategoryCreate'
import EditorialList from './components/editorials/EditorialList'
import EditorialCreate from './components/editorials/EditorialCreate'
import BookList from './components/books/BookList'
import BookCreate from './components/books/BookCreate'
import BookDetail from './components/books/BookDetail'

import Navbar from './components/layout/Navbar'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/authors' component={AuthorList}/>
            <Route exact path='/authors/create' component={AuthorCreate}/>
            <Route exact path='/categories' component={CategoryList}/>
            <Route exact path='/categories/create' component={CategoryCreate}/>
            <Route exact path='/editorials' component={EditorialList}/>
            <Route exact path='/editorials/create' component={EditorialCreate}/>
            <Route exact path='/books' component={BookList}/>
            <Route exact path='/books/create' component={BookCreate}/>
            <Route exact path='/books/:id' component={BookDetail}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
