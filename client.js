const render = require('react-dom').render
const h = require('react-hyperscript')

document.addEventListener('DOMContentLoaded', () => {
	render(
		enhancer({
			component: Client,
			nextProps: {
				test: 'success'
			}
		}),
		document.getElementById('here')
	)	
})

const Client = (props) => h('div', {}, [
	h('h1', {}, 'Coming to you live'),
	h('h3', {}, 'PROPS: '),
	h('ul', {}, [
		props && Object.keys(props).map(prop => h('li', {key: prop}, prop + ': ' + props[prop]))
	])
])

const enhancer = ({component, nextProps}) => {
// I want to use spread-operator here but i dont have es6 polyfills feelsbadman
	const enhancedProps = Object.assign({}, component.props, nextProps)
	return h(component, enhancedProps)
}