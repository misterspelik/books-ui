import axios from 'axios'
import { getToken } from '../utils/auth'

class AjaxService {

  constructor () {
    this.siteUrl = process.env.VUE_APP_ROOT_API
    this.apiVersion = 'api'
  }

  getApiUrl() {
    return `${this.siteUrl}/${this.apiVersion}`
  }

  makeGetRequest(url, data = null, headers = null) {
    let params = {
      params: data
    }
    if (headers) {
      params.headers = headers
    }

    return this._makeRequest(url, params)
  }

  makePostRequest(url, data, headers=null) {
    return this._postDataRequest(url, 'POST', data, headers)
  }

  makePutRequest(url, data, headers) {
    return this._postDataRequest(url, 'PUT', data, headers)
  }

  makeDeleteRequest(url, data, headers) {
    return this._postDataRequest(url, 'DELETE', data, headers)
  }

  makeUploadRequest(url, data, headers) {
    return axios.post( this.getApiUrl() + url, data, {
      headers: headers
    }).then((response) =>{
      return response.data
    })
    .catch(function(){
      console.log('FAILURE!!');
    })
  }

  _postDataRequest(url, method, data, headers) {
    let default_header = {
      'Content-Type':'application/json;charset=UTF-8'
    },
    compiled_headers = (!headers ? default_header : {...default_header, ...headers}),
    params = {
      data: data,
      method: method,
      credentials: 'include',
      headers: compiled_headers
    }
    
    return this._makeRequest(url, params)
  }

  _makeRequest(url, params) {
    if (params.headers) {
      params.headers['Authorization'] = getToken()
    } else {
      params.headers = {
        'Authorization': getToken()
      }
    }

    return axios(this.getApiUrl() + url, params)
    .then((response) => {
      return response.data
    })
  }
}

export default AjaxService