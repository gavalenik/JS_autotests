class Request {
  constructor (url, postData, queryParams, headers) {
    this.url = url
    this.postData = postData
    this.queryParams = queryParams
    this.headers = headers
  }
}

class Response {
  constructor (url, body, headers) {
    this.url = url
    this.body = body
    this.headers = headers
  }
}

class NetworkService {
  constructor (options) {
    this.options = options
  }

  static requests = []

  static responses = []

  lookForOurRequest (object1, object2) {
    if (Array.isArray(object1)) {
      const result = object1.filter((item) => this.objectsComparing(item, object2))
      return result.length > 0
    }
    return this.objectsComparing(object1, object2)
  }

  objectsComparing (object1, object2) {
    for (const key in object2) {
      if (object1[key] !== object2[key]) {
        return false
      }
    }
    return true
  }

  async urlIsNeeded (requestUrl, urls) {
    let flag = false
    urls.forEach((url) => {
      if (requestUrl.includes(url)) flag = true
    })
    return flag
  }

  async before () {
    const puppeteer = await browser.getPuppeteer()
    global.page = (await puppeteer.pages())[0]
    const urls = ['product-category/menu/pizza/']

    await page.on('request', async (request) => {
      const requestUrl = request.url()

      if (await this.urlIsNeeded(requestUrl, urls)) {
        const requestQueryParams = Object.fromEntries(new URLSearchParams(requestUrl))
        NetworkService.requests.push(
          new Request(requestUrl, request.postData(), requestQueryParams, request.headers())
        )
      }
    })

    await page.on('response', async (response) => {
      if (await this.urlIsNeeded(response.url(), urls)) {
        const responseBody = (await response.json()).data
        NetworkService.responses.push(
          new Response(response.url(), responseBody, response.headers())
        )
      }
    })

    browser.addCommand('waitForRequestCustom', async (requestData) => {
      const defaultValues = {
        url: '', postData: undefined, queryParams: {}, headers: {}
      }
      const request = { ...defaultValues, ...requestData }
      let result = []

      await browser.waitUntil(() => {
        result = NetworkService.requests.filter((item) => (
          item.url === request.url &&
                        item.postData === request.postData &&
                        this.lookForOurRequest(item.queryParams, request.queryParams) &&
                        this.lookForOurRequest(item.headers, request.headers)
        ))
        return result.length >= 1
      })
    })

    browser.addCommand('waitForResponseCustom', async (responseData) => {
      const defaultValues = { url: '', body: {}, headers: {} }
      const response = { ...defaultValues, ...responseData }
      let result = []

      await browser.waitUntil(() => {
        result = NetworkService.responses.filter((item) => (
          item.url === response.url &&
                        this.lookForOurRequest(item.body, response.body) &&
                        this.lookForOurRequest(item.headers, response.headers)
        ))
        return result.length >= 1
      })
    })
  }
}

module.exports = { NetworkService }
