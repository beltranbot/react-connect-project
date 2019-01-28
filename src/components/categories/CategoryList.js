import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { categories_json_url } from '../../config'

class CategoryList extends Component {

  state = {
    categories: []
  }

  async componentDidMount() {
    let response = await axios.get(categories_json_url)
    let categories = response.data
    this.setState({ categories })
  }

  render() {
    let categories = this.state.categories.map(category => {
      return (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.nombre}</td>
        </tr>
      )
    })

    return (
      <main role="main" className="container">
        <div className="jumbotron">
          <div>
            <Link className="btn btn-primary" to={'/categories/create'}>Nueva Categoría</Link>
          </div>
          <table className="table table-hover">
            <thead className="thead-dark">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories}
            </tbody>
          </table>
        </div>
      </main>

    )
  }

}

export default CategoryList