import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  componentDidMount() {
    console.log('loading home...')
  }

  render() {

    let linksList = [
      <li key="authors" className='list-group-item'>
        <Link to={`/authors`}>Autores</Link>
      </li>,
      <li key="categories" className='list-group-item'>
        <Link to={"/categories"}>Categorías</Link>
      </li>,
      <li key="editorials" className='list-group-item'>
        <Link to={"/editorials"}>Editoriales</Link>
      </li>,
      <li key="books" className='list-group-item'>
        <Link to={"/books"}>Libros</Link>
      </li>,
    ]

    return (

      <main role="main" className="container">
        <div className="jumbotron">
          <h1>Entidades</h1>
          <ul className='list-group'>
            {linksList}
          </ul>
        </div>
      </main>
    )
  }
}

export default Home