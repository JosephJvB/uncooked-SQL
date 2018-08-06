const render = require('react-dom').render
const h = require('react-hyperscript')

const testComponent = (props) => h('div', {}, [
	h('h1', {}, 'Coming to you live'),
	h('h3', {}, 'PROPS: '),
	h('ul', {}, [
		props && Object.keys(props).map(prop => h('li', { key: prop }, prop + ': ' + props[prop]))
	])
])

const addButtsToProps = () => (component) => (componentProps) => {
	const buttProps = Object.assign({}, {buttProp: 'butt'}, componentProps)
	return h(component, buttProps)
}

const ReactRoot = addButtsToProps()(testComponent)

document.addEventListener('DOMContentLoaded', () => {
	render(
		h(ReactRoot, {first: 'success'}),
		document.getElementById('here')
	)	
})