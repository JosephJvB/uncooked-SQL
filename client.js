const render = require('react-dom').render
const h = require('react-hyperscript')

document.addEventListener('DOMContentLoaded', () => {
	render(
		h(Client),
		document.getElementById('here')
	)	
})

const Client = () => h('div', {}, [
	h('h1', {}, 'Coming to you live'),
	h('ul', {}, [
		props && Object.keys(props).map(prop => h('li', {}, prop))
	])
])