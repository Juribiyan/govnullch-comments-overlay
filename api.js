const thread = new URLSearchParams(document.location.search).get('thread') || '9901'
const srv = 'http://127.0.0.1:3000'
var lastID = 0

function getPosts(thread, after=null) {
	return new Promise((resolve, reject) => {
		fetch(`${srv}/${thread}${after ? `/${after}` : ''}`)
		.then((response) => response.json())
		.then(data => resolve(data.posts))
	})
}

function fetchPosts(after=lastID) {
	getPosts(thread, after).then(posts => {
		if (!posts.length) return;
		posts.forEach(post => {
			if (post.messageHtml != '') {
				buildPost(post.messageHtml)
				let id = +post.id
				if (id > lastID)
					lastID = id
			}
		})
	})
}

function buildPost(html) {
	document.body.insertAdjacentHTML('beforeend', `<div class="post">${html}</div>`)
}

function main() {
	fetchPosts()
	setInterval(fetchPosts, 1000)
}