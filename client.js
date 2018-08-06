const render = require('react-dom').render
const h = require('react-hyperscript')

const testComponent = (props) => h('div', {}, [
	h('h1', {}, 'Coming to you live'),
	h('h3', {}, 'PROPS: '),
	h('ul', {}, [
		props && Object.keys(props).map(prop => h('li', { key: prop }, prop + ': ' + props[prop]))
	])
])

const enhancer = (firstProps) => (component) => {
	const enhancedProps = Object.assign({}, firstProps, component.props)
	return h(component, enhancedProps)
}

const ReactRoot = enhancer({first: 'success'})(testComponent)

document.addEventListener('DOMContentLoaded', () => {
	render(
		h(ReactRoot, {second: 'success'}),
		document.getElementById('here')
	)	
})