const render = require('react-dom').render
const h = require('react-hyperscript')

const testComponent = (props) => h('div', {}, [
	h('h1', {}, 'Coming to you live'),
	h('h3', {}, 'PROPS: '),
	h('ul', {}, [
		props && Object.keys(props).map(prop => h('li', { key: prop }, prop + ': ' + props[prop]))
	])
])

// i just added functions returning functions till it worked
const addButtsToProps = () => (component) => (componentProps) => {
	const buttProps = Object.assign({}, {buttProp: 'butt'}, componentProps)
	return h(component, buttProps)
}

/*
	Might make it easier to see what's happening like this:

	function enhance () {
		return function takeComponent(Comp) {
			return function takeCompProps(compProps) {
				const enhancedProps = {
					...compProps,
					...enhancements
				}
				return <Comp enhancedProps/>
			}
		}
	}
*/

const ReactRoot = addButtsToProps()(testComponent)
// addButtsToProps gets called twice which returns a function ready to take props

document.addEventListener('DOMContentLoaded', () => {
	render(
	//by the time ReactRoot is here, addButts has already been called twice and is ready to take on props
		h(ReactRoot, {first: 'success'}),
		document.getElementById('here')
	)	
})