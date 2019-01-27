import axios from 'axios'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {
  books_json_url,
  authors_json_url,
  categories_json_url,
  editorials_json_url
} from '../../config'

class BookList extends Component {

  state = {
    books: [],
    authors: [],
    categories: [],
    query_titulo: '',
    query_subtitulo: '',
    query_fecha_publicacion: '',
    query_descripcion: '',
    query_editorial: '',
    query_autor: '',
    query_categoria: ''
  }

  async loadData () {
    let response = await axios.get(books_json_url)
    let books = response.data
    response = await axios.get(authors_json_url)
    let authors = response.data
    response = await axios.get(categories_json_url)
    let categories = response.data
    response = await axios.get(editorials_json_url)
    let editorials = response.data

    let {
      query_titulo,
      query_subtitulo,
      query_fecha_publicacion,
      query_descripcion,
      query_editorial,
      query_autor,
      query_categoria,
    } = this.state

    books = books.filter(book => {
      let editorial = ''
      if (book.editorial) {
        editorial = editorials.filter(editorial => editorial.id === book.editorial)[0]
        editorial = editorial ? editorial.nombre : null
      }

      let autores = []
      if (book.autores.length > 0) {
        autores = authors.filter(author => book.autores.reduce((a, c) => {
          return a || c === author.id
        }, false))
        if (autores) {
          autores = autores.map(author => author.nombre)
        }
      }

      let categorias = []
      if (book.categorias.length > 0) {
        categorias = categories.filter(category => book.categorias.reduce((a, c) => {
          return a || c === category.id
        }, false))
        if (categorias) {
          categorias = categorias.map(category => category.nombre)
        }
      }

      let result = []
      if (query_titulo.length > 0) {
        result.push(book.titulo.toLowerCase().includes(query_titulo.toLowerCase()))
      }
      if (query_subtitulo.length > 0) {
        result.push(book.subtitulo.toLowerCase().includes(query_subtitulo.toLowerCase()))
      }
      if (query_fecha_publicacion.length > 0) {
        if (book.fecha_publicacion) {
          result.push(book.fecha_publicacion.includes(query_fecha_publicacion))
        } else {
          result.push(false)
        }
      }
      if (query_descripcion.length > 0) {
        if (book.descripcion) {
          result.push(book.descripcion.toLowerCase().includes(query_descripcion.toLowerCase()))
        } else {
          result.push(false)
        }
      }

      if (query_editorial.length > 0) {
        if (editorial) {
          result.push(editorial.toLowerCase().includes(query_editorial.toLowerCase()))
        } else {
          result.push(false)
        }
      }

      if (query_autor.length > 0) {
        if (!book.autores) {
          result.push(false) 
        } else {
          let local_result = autores.reduce(
            (a, c) => a || c.toLowerCase().includes(query_autor.toLowerCase()),
            false
          )

          result.push(local_result)
        }
      }

      if (query_categoria.length > 0) {
        if (!book.categorias) {
          result.push(false) 
        } else {
          let local_result = categorias.reduce(
            (a, c) => a || c.toLowerCase().includes(query_categoria.toLowerCase()),
            false
          )

          result.push(local_result)
        }
      }

      return result.reduce((a,c) => a && c, true)
    })

    this.setState({
      books,
      authors,
      categories,
      editorials
    })
  }
  
  componentDidMount() {
    this.loadData()
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.loadData()
  }

  handleResetFilters = e => {
    document.getElementById("query_form").reset()
    let query_titulo = ''
    let query_subtitulo = ''
    let query_fecha_publicacion = ''
    let query_descripcion = ''
    let query_editorial = ''
    this.setState({
      query_titulo,
      query_subtitulo,
      query_fecha_publicacion,
      query_descripcion,
      query_editorial,
    })
    this.loadData()
  }

  render() {
    let books = []
    let {authors, categories, editorials} = this.state
    if (this.state.books.length !== 0) {
      books = this.state.books.map(book => {

        let autores = book.autores.map(autor_id => {
          let autor = authors.filter(author => author.id === autor_id)[0]
          return (
            <li key={autor.id}>{autor.nombre}</li>
          )
        })
        let categorias = book.categorias.map(categoria_id => {
          let categoria = categories.filter(category => category.id === categoria_id)[0]
          return (
            <li key={categoria.id}>{categoria.nombre}</li>
          )
        })
        let editorial = editorials.filter(editorial => book.editorial === editorial.id)[0]
        editorial = editorial ? editorial.nombre : null

        return (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.titulo}</td>
            <td>{book.subtitulo}</td>
            <td>{book.fecha_publicacion}</td>
            <td>
              <ul>
                {autores}
              </ul>
            </td>
            <td>
              <ul>
                {categorias}
              </ul>
            </td>
            <td>{book.descripcion}</td>
            <td>{editorial}</td>
          </tr>
        )
      })
    }

    return (
      <div className="container">
        <div>
          <Link to={'/books/create'}>Nuevo Libro</Link>
        </div>
        <div>
          <form id="query_form" className="white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Filtros de Busqueda</h5>
            <div className="input-field">
              <label htmlFor="query_titulo">Titulo</label>
              <input type="text"
                id="query_titulo"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="query_subtitulo">Subtitulo</label>
              <input type="text"
                id="query_subtitulo"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="query_fecha_publicacion">Fecha Publicación</label>
              <input type="date"
                id="query_fecha_publicacion"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="query_descripcion">Descripción</label>
              <input type="text"
                id="query_descripcion"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="query_editorial">Editorial</label>
              <input type="text"
                id="query_editorial"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="query_autor">Autor</label>
              <input type="text"
                id="query_autor"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="query_categoria">Categoría</label>
              <input type="text"
                id="query_categoria"
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
                <button className="btn pink lighten-1 z-depth-0">Filtrar</button>
            </div>          
          </form>
          <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0" onClick={this.handleResetFilters}>limpiar filtros</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Subtitulo</th>
              <th>Fecha Publicación</th>
              <th>Autor(es)</th>
              <th>Categoría(s)</th>
              <th>Descripción</th>
              <th>Editorial</th>
            </tr>
          </thead>
          <tbody>
            {books}
          </tbody>
        </table>
      </div>
    )
  }

}

export default BookList