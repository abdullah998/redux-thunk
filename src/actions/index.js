import axios from 'axios'

export const search = () => {
  return async dispatch => {
    const response =
    await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: document.getElementById('searchId').value,
        APPID: 'f331581e1725a93c28647659d1afcc02'
      }
    })
    dispatch({
      type: 'SEARCH',
      payload: { query: JSON.stringify(response) }
    })
  }
}
