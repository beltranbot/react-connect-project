import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { authors_json_url } from '../../config'

class AuthorList extends Component {

  state = {
    authors: []
  }

  async componentDidMount() {
    let response = await axios.get(authors_json_url)
    let authors = response.data
    this.setState({ authors })
  }

  render() {
    let authors = this.state.authors.map(author => {
      return (
        <tr key={author.id}>
          <td>{author.id}</td>
          <td>{author.nombre}</td>
        </tr>
      )
    })

    return (
      <main role="main" class="container">
        <div className="jumbotron">
          <div>
            <Link class="btn btn-primary" to={'/authors/create'}>Nuevo Autor</Link>
          </div>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {authors}
            </tbody>
          </table>
        </div>
      </main>

    )
  }

}

export default AuthorList