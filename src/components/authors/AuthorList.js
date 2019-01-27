import axios from 'axios'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {authors_json_url} from '../../config'

class AuthorList extends Component {

  state = {
    authors: []
  }
  
  async componentDidMount() {
    // const proxy = 'https://cors-anywhere.herokuapp.com/'
    // let url = 'https://rocky-reaches-72412.herokuapp.com/authors.json'
    // let response = await axios.get(proxy + url)
    let response = await axios.get(authors_json_url)
    let authors = response.data
    this.setState({authors})
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
      <div className="container">
        <div>
          <Link to={'/authors/create'}>Nuevo Autor</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {authors}
          </tbody>
        </table>
      </div>
    )
  }

}

export default AuthorList