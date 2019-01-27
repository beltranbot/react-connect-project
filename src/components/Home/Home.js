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
        <Link to={`/categories`}>Categorías</Link>
        <Link to={`/editorials`}>Editoriales</Link>
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