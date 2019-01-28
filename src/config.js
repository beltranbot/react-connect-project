const proxy = 'https://cors-anywhere.herokuapp.com/'
const base_url = 'https://rocky-reaches-72412.herokuapp.com/'
// const base_url = 'http://127.0.0.1:8000/'

const use_proxy = false
let url = ''
if (use_proxy) {
  url = proxy + base_url
} else {
  url = base_url
}

const authors_url = url + 'authors'
const authors_json_url = authors_url + '.json'

const categories_url = url + 'categories'
const categories_json_url = categories_url + '.json'

const editorials_url = url + 'editorials'
const editorials_json_url = editorials_url + '.json'

const books_url = url + 'books'
const books_json_url = books_url + '.json'

export {
  proxy,
  base_url,
  url,
  authors_url,
  authors_json_url,
  categories_url,
  categories_json_url,
  editorials_url,
  editorials_json_url,
  books_url,
  books_json_url,
}
