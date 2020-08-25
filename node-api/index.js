const fetch = require('node-fetch')
const express = require('express')
const cors = require('cors')
const app = express()
const parse = require('node-html-parser').parse
const https = require('https')
const SocksProxyAgent = require('socks-proxy-agent')

const chans = {
  pl: {
    engine: 'govnullch',
    api: `https://www.0chan.club/api`,
    session: 'gx8ugpq6c3h0wiicvhcz75jf7wdap2c7',
    fetchOptions: {
      headers: {
        cookie: "disclaimer=1; welcome_text=true"
      }
    }
  },
  cc: {
    engine: 'instant',
    api: 'https://0chan.cc'
  },
  metator: {
    engine: 'instant',
    api: 'http://metatorrkdagnx2njwvnzqeclsk3qbwabr6hori4vmivj25qy6s6gsad.onion',
    fetchOptions: {
      agent: new SocksProxyAgent('socks://127.0.0.1:9050')
    }
  }
}

app.use(cors())

const engines = {
  govnullch: function(chan, req, res) {
    fetch(`${chan.api}/thread?thread=${req.params.thread}${req.params.after ? `&after=${req.params.after}` : ''}&session=${chan.session}`, chan.fetchOptions)
    .then(r => r.json())
    .then(json => {
      res.json(json)
    })
    .catch(err => {
      res.json(null)
    })
  },
  instant: function(chan, req, res) {
    let ts = req.params.thread.split("-")
    , last = req.params.after ? +req.params.after : 0
    , posts = []
    fetch(`${chan.api}/${ts[0]}/res/${ts[1]}.html`, chan.fetchOptions)
    .then(r => r.text())
    .then(text => {
      parse(text).querySelectorAll('.postnode').forEach(post => {
        let id = +(post.getAttribute('data-id'))
        if (id > last) {
          posts.push({
            id: id,
            messageHtml: post.querySelector('.postmessage').innerHTML
          })
        }
      })
      res.json(posts)
    })
    .catch(err => {
      console.warn(err)
      res.json(null)
    })
  }
}

app.get('/:chan/:thread/:after?', function (req, res) {
  if (chans.hasOwnProperty(req.params.chan) && engines.hasOwnProperty(chans[req.params.chan].engine)) {
    engines[chans[req.params.chan].engine](chans[req.params.chan], req, res)
  }
  else {
    res.json(null)
  }
})
 
app.listen(3000)