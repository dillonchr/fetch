const http = require("http")
const https = require("https")
const urlLib = require("url")

const HTTPS_REGEX = /^https:\/\//i
const getProtocolFromUri = uri => (HTTPS_REGEX.test(uri) ? https : http)

const fetch = ({ url, headers, method, body }, callback) => {
  if (!url) {
    throw new Error("No `url` provided in options")
  }

  const { protocol, hostname, port, path, query } = urlLib.parse(url)
  if (!hostname) {
    throw new Error(`No hostname could be found in ${url}`)
  }

  const options = {
    headers,
    hostname,
    method,
    path,
    port,
    protocol,
    query
  }

  const promise = new Promise((resolve, reject) => {
    const req = getProtocolFromUri(url).request(options, response => {
      let body = ""

      response.on("data", function (chunk) {
        body += chunk
      })

      response.on("end", function () {
        try {
          const json = JSON.parse(body)
          resolve(json)
        } catch (ignore) {
          resolve(body)
        }
      })
    })

    req.on("error", err => reject(err))

    if (body) {
      req.write(JSON.stringify(body))
    }

    req.end()
  })

  if (callback) {
    promise.then(callback.bind(this, null)).catch(callback)
  } else {
    return promise
  }
}

module.exports = fetch
