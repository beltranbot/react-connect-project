import axios from 'axios'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {editorials_json_url} from '../../config'

class EditorialList extends Component {

  state = {
    editorials: []
  }
  
  async componentDidMount() {
    let response = await axios.get(editorials_json_url)
    let editorials = response.data
    this.setState({editorials})
  }

  render() {
    let editorials = this.state.editorials.map(editorial => {
      return (
        <tr key={editorial.id}>
          <td>{editorial.id}</td>
          <td>{editorial.nombre}</td>
        </tr>
      )
    })

    return (
      <main role="main" class="container">
        <div className="jumbotron">
          <div>
            <Link class="btn btn-primary" to={'/editorials/create'}>Nueva Editorial</Link>
          </div>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {editorials}
            </tbody>
          </table>
        </div>
      </main>
    )
  }

}

export default EditorialList