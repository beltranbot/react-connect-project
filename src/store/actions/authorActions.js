import axios from 'axios'

export const loadAuthors = () => {
  return async (dispatch, getState) => {
    try {
      let url = '127.0.0.1/authors.json'
      let response = await axios.get('url')
      let authors = response.data

      dispatch({type: 'LOAD_AUTHORS', authors})
    }
  }
  
}
