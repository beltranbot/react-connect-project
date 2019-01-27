import axios from 'axios'
import React, { Component } from 'react'
import {
  books_json_url,
  authors_json_url,
  categories_json_url,
  editorials_json_url,
} from '../../config'

class BookCreate extends Component {

  state = {
    titulo: '',
    subtitulo: '',
    fecha_publicacion: '',
    descripcion: '',
    imagen: '',
    autores: [],
    autores_list:[],
    categorias: [],
    categorias_list:[],
    editorials_list:[],
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

  render () {
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
      <div className='container'>
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Crear Nuevo Libro</h5>
          <div className="input-field">
            <label htmlFor="titulo">Titulo *</label>
            <input type="text"
              id="titulo"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="subtitulo">Subtitulo *</label>
            <input type="text"
              id="subtitulo"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="fecha_publicacion">Fecha Publicación*</label>
            <input type="date"
              id="fecha_publicacion"
              format="YYYY-MM-DD"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="autores">autores</label>
            <select id="autores" name="autores[]" multiple onChange={this.handleChange}>
              {autores}
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="descripcion">Descripción*</label>
            <textarea
              id="descripcion"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="categorias">Categorías</label>
            <select id="categorias" name="categorias[]" multiple onChange={this.handleChange}>
              {categorias}
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="editorial">editorial *</label>
            <select id="editorial" name="editorial" onChange={this.handleChange}>
              {editoriales}
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="imagen">Imagen</label>
            <input type="file"
              id="imagen" name="imagen"
              accept="image/png, image/jpeg"
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

export default BookCreate