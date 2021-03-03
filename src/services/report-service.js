import AjaxService from './ajax-service'

class ReportService extends AjaxService {

  list (params = {}) {
    return this.makeGetRequest('/reports', params)
  }
}

const _instance = new ReportService()
export default _instance