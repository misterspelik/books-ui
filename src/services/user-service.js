import AjaxService from './ajax-service'

class UserService extends AjaxService {

  login (formData) {
    return this.makePostRequest('/login', formData)
  }

  logout () {
    return this.makeGetRequest('/logout')
  }

  me () {
    return this.makeGetRequest('/me')
  }

  list (params = {}) {
    return this.makeGetRequest('/users', params)
  }

  delete ( userId ) {
    return this.makeDeleteRequest('/users/delete', userId)
  }
}

const _instance = new UserService()
export default _instance