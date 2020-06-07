const fetch = require('node-fetch')
const express = require('express')
const cors = require('cors')
const app = express()

const api = `https://www.0chan.club/api`
const session = 'FILLME' // ← DO IT

const fetchOptions = {
  headers: {
    cookie: "disclaimer=1; welcome_text=true"
  }
}

app.use(cors())

app.get('/:thread/:after?', function (req, res) {
  fetch(`${api}/thread?thread=${req.params.thread}${req.params.after ? `&after=${req.params.after}` : ''}&session=${session}`, fetchOptions)
    .then(r => r.json())
    .then(json => {
      res.json(json)
    })
})
 
app.listen(3000)