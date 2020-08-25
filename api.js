const thrs = new URLSearchParams(document.location.search).get('threads')
const threads = thrs ? thrs.split(',') : ['pl/10607']
const srv = 'http://127.0.0.1:3000'

const chans = {
  pl: { engine: 'govnullch' },
  cc: { engine: 'instant' },
  metator: { engine: 'instant' }
}

const engines = {
	govnullch: {
		getPosts: function(thread, after=null) {
			return new Promise((resolve, reject) => {
					fetch(`${srv}/${thread}${after ? `/${after}` : ''}`)
					.then((response) => response.json())
					.then(data => resolve(data.posts))
				})
		},
		buildPost: function(html, chan) {
			document.body.insertAdjacentHTML('beforeend', `<div class="post" data-chan="${chan}">${html}</div>`)
		}
	},
	instant: {
		getPosts: function(thread, after=null) {
			return new Promise((resolve, reject) => {
					fetch(`${srv}/${thread}${after ? `/${after}` : ''}`)
					.then((response) => response.json())
					.then(data => resolve(data))
				})
		},
		buildPost: function(html, chan) {
			document.body.insertAdjacentHTML('beforeend', `<div class="post" data-chan="${chan}">${html}</div>`)
		}
	},

}

function fetchPosts(thr) {
	let lastID = lastPosts[thr.index]
	engines[thr.engine].getPosts(thr.thread, lastID).then(posts => {
		console.log(posts)
		if (!posts || !posts.length) return;
		posts.forEach(post => {
			if (post.messageHtml != '') {
				engines[thr.engine].buildPost(post.messageHtml, thr.chan)
				let id = +post.id
				if (id > lastID)
					lastPosts[thr.index] = id
			}
		})
	})
	.finally(() => setTimeout(()=>fetchPosts(thr), 2000))
}


var lastPosts = []

function main() {
	let supported = []
	threads.forEach((thr, index) => {
		let chan = thr.split('/')[0]
		if (chans.hasOwnProperty(chan) && chans[chan].engine && engines.hasOwnProperty(chans[chan].engine)) {
			supported.push({
				engine: chans[chan].engine,
				chan: chan,
				thread: thr,
				index: index
			})
			lastPosts.push(0)
		}
	})
	supported.forEach(fetchPosts)
}