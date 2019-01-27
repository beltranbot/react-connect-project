import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Home extends Component {
  componentDidMount() {
    console.log('loading home...')
  }

  render() {

    let linksList = [
      <li key="authors">
        <Link to={`/authors`}>Autores</Link>
      </li>,
      <li key="categories">
        <Link to={"/categories"}>Categorías</Link>
      </li>,
      <li key="editorials">
        <Link to={"/editorials"}>Editoriales</Link>
      </li>,
      <li key="books">
        <Link to={"/books"}>Libros</Link>
      </li>,
    ]

    return (
      <div className="links">
        {linksList}
      </div>
    )
  }
}

export default Home