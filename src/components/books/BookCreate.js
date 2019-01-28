import axios from 'axios'
import React, { Component } from 'react'
import {
  books_json_url,
  authors_json_url,
  categories_json_url,
  editorials_json_url,
} from '../../config'
import { Link } from 'react-router-dom'

class BookCreate extends Component {

  state = {
    titulo: '',
    subtitulo: '',
    fecha_publicacion: '',
    descripcion: '',
    imagen: '',
    autores: [],
    autores_list: [],
    categorias: [],
    categorias_list: [],
    editorials_list: [],
    editorial: null,
  }

  async componentDidMount() {
    let response = await axios.get(authors_json_url)
    let autores_list = response.data
    response = await axios.get(categories_json_url)
    let categorias_list = response.data
    response = await axios.get(editorials_json_url)
    let editorials_list = response.data

    this.setState({
      autores_list,
      categorias_list,
      editorials_list,
    })
  }

  handleChange = (e) => {

    if (e.target.id === 'imagen') {
      this.setState({
        [e.target.id]: e.target.files
      })
    } else if (['autores', 'categorias'].includes(e.target.id)) {
      let selectedOptions = []
      for (let i = 0; i < e.target.selectedOptions.length; i++) {
        selectedOptions.push(+e.target.selectedOptions[i].value)
      }
      this.setState({
        [e.target.id]: selectedOptions
      })
    } else {
      this.setState({
        [e.target.id]: e.target.value
      })
    }
  }

  validateData = (data) => {
    let {
      titulo,
      subtitulo,
      fecha_publicacion,
      descripcion,
    } = data
    if (titulo.trim().length === 0) {
      alert('Debe Ingresar un Titulo de libro valido.')
      return false
    }
    if (subtitulo.trim().length === 0) {
      alert('Debe Ingresar un Subtitulo de libro valido.')
      return false
    }
    if (fecha_publicacion.trim().length === 0) {
      alert('Debe Ingresar una Fecha de Publicación de libro valido.')
      return false
    }
    if (descripcion.trim().length === 0) {
      alert('Debe Ingresar una Descripción válida.')
      return false
    }
    return true
  }

  preparePostData = () => {
    let book = new FormData()
    book.append('titulo', this.state.titulo)
    book.append('subtitulo', this.state.subtitulo)
    book.append('fecha_publicacion', this.state.fecha_publicacion)
    book.append('descripcion', this.state.descripcion)
    book.append('editorial', this.state.editorial)

    for (const autor of this.state.autores) {
      book.append('autores', autor)
    }

    for (const categoria of this.state.categorias) {
      book.append('categorias', categoria)
    }

    if (this.state.imagen) {
      let file = this.state.imagen[0]
      book.append('imagen', file, file.name)
    }

    return book
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    if (!this.validateData(this.state)) return

    let book = this.preparePostData()

    let response = await axios.post(books_json_url, book)

    if (response.request.status === 201) {
      this.props.history.push('/books')
    } else {
      let message = "Se generaron errores al momento de registrar Libro\n"
      alert(message)
    }
  }

  render() {
    let {
      autores_list,
      categorias_list,
      editorials_list
    } = this.state
    let autores = []
    if (autores_list.length !== 0) {
      autores = autores_list.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.nombre}
          </option>
        )
      })
    }
    let categorias = []
    if (categorias_list.length !== 0) {
      categorias = categorias_list.map(categoria => {
        return (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        )
      })
    }
    let editoriales = []
    if (editorials_list.length !== 0) {
      editoriales = editorials_list.map(editorial => {
        return (
          <option key={editorial.id} value={editorial.id}>
            {editorial.nombre}
          </option>
        )
      })
    }

    return (
      <main role="main" className="container">
        <div classNameName="jumbotron">
          <div className="card border-primary mb-3" >
            <div className="card-header">
              <Link to="/books">Volver</Link>
              <h4>Crear Nuevo libro</h4>
            </div>
            <div className="card-body">
              <form className="white" onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <div className="col">
                    <input type="file" className="custom-file-input"
                      id="imagen" name="imagen"
                      accept="image/png, image/jpeg"
                      onChange={this.handleChange}
                    />
                    <label className="custom-file-label" htmlFor="imagen">Imagen</label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <label htmlFor="titulo">Título *</label>
                    <input type="text"
                      id="titulo"
                      className="form-control form-control-sm"
                      placeholder="Título"
                      onChange={this.handleChange}
                    />
                  </div>

                </div>
                <div className="form-row">

                  <div className="col">
                    <label htmlFor="subtitulo">Subtitulo *</label>
                    <input type="text"
                      id="subtitulo"
                      placeholder="Subtitulo"
                      className="form-control form-control-sm"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="fecha_publicacion">Fecha Publicación*</label>
                    <input type="date"
                      id="fecha_publicacion"
                      format="YYYY-MM-DD"
                      className="form-control form-control-sm"
                      onChange={this.handleChange}
                    />
                  </div>

                </div>
                <div className="form-row">
                  <div className="col">
                    <label htmlFor="autores">Autores</label>
                    <select className="form-control form-control-sm" id="autores" name="autores[]" multiple onChange={this.handleChange}>
                      {autores}
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="categorias">Categorías</label>
                    <select className="form-control form-control-sm" id="categorias" name="categorias[]" multiple onChange={this.handleChange}>
                      {categorias}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <label htmlFor="descripcion">Descripción*</label>
                    <textarea
                      id="descripcion"
                      className="form-control form-control-sm"
                      onChange={this.handleChange}
                    />
                  </div>



                  <div className="col">
                    <label htmlFor="editorial">Editorial *</label>
                    <select className="form-control form-control-sm" id="editorial" name="editorial" onChange={this.handleChange}>
                      {editoriales}
                    </select>
                  </div>

                </div>
                <div className="form-row">
                  <div className="col">
                    <button className="btn btn-primary">Crear</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    )
  }

}

export default BookCreate