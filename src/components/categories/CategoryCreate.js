import axios from 'axios'
import React, { Component } from 'react'
import {categories_json_url} from '../../config'
import {Link} from 'react-router-dom'

class CategoryCreate extends Component {

  state = {
    nombre: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  validateData = (data) => {
    let {nombre} = data
    if (nombre.trim().length === 0) {
      alert('Debe Ingresar un nombre de categoria valido.')
      return false
    }
    return true
  }
  

  handleSubmit = async (e) => {
    e.preventDefault()
    if (!this.validateData(this.state)) return

    let category = {nombre: this.state.nombre}
    let response = await axios.post(categories_json_url, category)

    if (response.request.status === 201) {
      this.props.history.push('/categories')
    } else {
      let message = "Se generaron errores al momento de registrar Categoria\n"
      alert(message)
    }
  }

  render () {
    
    return (

      <main role="main" className="container">
        <div classNameName="jumbotron">
          <div className="card border-primary mb-3" >
            <div className="card-header">
              <Link to="/categories">Volver</Link>
              <h4>Crear Nueva Categoría</h4>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>                
                <div className="form-group">
                  <label htmlFor="title" className="form-label">Nombre</label>
                  <input type="text"
                    className="form-control"
                    id="nombre"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <button className="form-control btn btn-primary">Crear</button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </main>
    )
  }

}

export default CategoryCreate