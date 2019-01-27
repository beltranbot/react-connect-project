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
    count: 0,
    query_titulo: ''
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

    let {query_titulo} = this.state

    books = books.filter(author => {
      let result = []
      if (query_titulo.length > 0) {
        result.push(author.titulo.includes(query_titulo))
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
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Filtros de Busqueda</h5>
          <div className="input-field">
            <label htmlFor="query_titulo">Titulo</label>
            <input type="text"
              id="query_titulo"
              onChange={this.handleChange}
            />
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Filtrar</button>
          </div>
          </div>
        </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Subtitulo</th>
              <th>Fecha Publicación</th>
              <th>Autor(es)</th>
              <th>Descripción</th>
              <th>Categoría(s)</th>
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