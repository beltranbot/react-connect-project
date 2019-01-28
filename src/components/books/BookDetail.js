import axios from 'axios'
import React, { Component } from 'react'
import {
  books_url,
  authors_json_url,
  categories_json_url,
  editorials_json_url,
} from '../../config'
import { Link } from 'react-router-dom'

class BookDetail extends Component {
  state = {
    autores: [],
    autores_list: [],
    categorias: [],
    categorias_list: [],
    editorials_list: [],
    editorial: null,
    book: null,
  }

  async componentDidMount() {
    let { id } = this.props.match.params
    let response = await axios.get(authors_json_url)
    let autores_list = response.data
    response = await axios.get(categories_json_url)
    let categorias_list = response.data
    response = await axios.get(editorials_json_url)
    let editorials_list = response.data
    response = await axios.get(`${books_url}/${id}.json`)
    let book = response.data

    let autores = []
    if (autores_list && book && book.autores) {
      autores = autores_list.filter(autor => book.autores.includes(autor.id))
        .map(autor => autor.nombre)
    }
    let categorias = []
    if (categorias_list && book && book.categorias) {
      categorias = categorias_list.filter(categoria => book.categorias.includes(categoria.id))
        .map(categoria => categoria.nombre)
    }

    let editorial = ''
    if (editorials_list && book && book.editorial) {
      editorial = editorials_list.filter(editorial => book.editorial === editorial.id)[0]
      editorial = editorial ? editorial.nombre : null
    }

    this.setState({
      autores_list,
      categorias_list,
      editorials_list,
      book,
      autores,
      categorias,
      editorial
    })
  }

  handleDelete = async e => {
    e.preventDefault()
    let {id} = this.props.match.params
    let url = `${books_url}/${id}/`
    await axios.delete(url)

    this.props.history.push('/books')

  }

  render() {
    let { book, autores, categorias, editorial } = this.state
    let list = []
    let imagen = null
    let titulo = null
    let subtitulo = null
    if (this.state.book) {
      let autores_list = autores.map(autor => <li key={autor}>{autor}</li>)
      let categorias_list = categorias.map(categoria => <li key={categoria}>{categoria}</li>)
      list.push(<li className="list-group-item" key={'ID'}><strong>ID:</strong> {book.id}</li>)
      list.push(<li className="list-group-item" key={'titulo'}><strong>Título:</strong> {book.titulo}</li>)
      list.push(<li className="list-group-item" key={'subtitulo'}><strong>Subtitulo:</strong> {book.subtitulo}</li>)
      list.push(<li className="list-group-item" key={'fecha_poublicacion'}><strong>Fecha </strong>publicación: {book.fecha_publicacion}</li>)
      list.push(<li className="list-group-item" key={'autores'}><strong>Autores:</strong><ul>{autores_list}</ul></li>)
      list.push(<li className="list-group-item" key={'categorias'}><strong>Categorías:</strong> <ul>{categorias_list}</ul></li>)
      list.push(<li className="list-group-item" key={'editorial'}><strong>Editorial:</strong> {editorial}</li>)
      list.push(<li className="list-group-item" key={'descripcion'}><strong>Descripción:</strong> {book.descripcion}</li>)
      titulo = book.titulo
      subtitulo = book.subtitulo
      imagen = book.imagen

    }
    let style = {
      width: '50%'
    }
    return (
      <main role="main" className="container">
        <div className="jumbotron">

          <div className="card" style={style}>
            <Link to='/books' className="btn btn-secondary">Regresar</Link>
            <img className="card-img-top" src={imagen} alt="Card cap" />
            <div className="card-body">
              <h5 className="card-title">{titulo}</h5>
              <p className="card-text">{subtitulo}</p>
            </div>
            <ul className="list-group list-group-flush">
              {list}
            </ul>
            <div className="card-body">
              <button onClick={this.handleDelete} className="btn btn-danger">Borrar Libro</button>
            </div>
          </div>
        </div>
      </main >
    )
  }
}

export default BookDetail