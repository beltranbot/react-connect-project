import axios from 'axios'
import React, { Component } from 'react'
import {categories_json_url} from '../../config'

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
      <div className='container'>
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Crear Nueva Categoria</h5>
          <div className="input-field">
            <label htmlFor="title">Nombre</label>
            <input type="text"
              id="nombre"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Crear</button>
          </div>
        </form>
      </div>
    )
  }

}

export default CategoryCreate