const http = require('http')
const fs = require('fs')
const hoods = require('hoods')
const URL = require('url')
const route = require('router')()

route.get('/', function (req, res) {

  var query = URL.parse(req.url,true).query

  if (query && query.lat && query.lng) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS'
    })
    res.write(JSON.stringify(hoods(query.lng, query.lat)))
    res.end()
    return
  }

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(fs.readFileSync('index.html', 'utf8'))
  res.end()
})

http.createServer(route).listen(process.env.PORT || 5000)
