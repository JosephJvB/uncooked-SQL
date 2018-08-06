const render = require('react-dom').render
const h = require('react-hyperscript')

/*
	OK admission: I messed up,
	I didn't have to make my enhancement 3 functions deep.
	Since the first function doesnt accept any parameters it's a useless wrapper.
	I guess I was hell-bent on re-creating Redux's connect.

	*I have removed the extra function layer as of this comment.
	OOPS no wonder that was tricky
*/

const testComponent = (props) => h('div', {}, [
	h('h1', {}, 'Coming to you live'),
	h('h3', {}, 'PROPS: '),
	props && h('ul', {}, [
		Object.keys(props).map(propKey => h('li', { key: propKey }, propKey + ': ' + props[propKey]))
	])
])

// i just added functions returning functions till it worked
const addButtsToProps = (component) => (componentProps) => {
	const buttProps = Object.assign({}, {buttProp: 'butt'}, componentProps)
	return h(component, buttProps)
}

/*
	Might make it easier to see what's happening like this:

	function enhanceCompnent(Comp) {
		return function renderCompWithNewProps(compProps) {
			const enhancedProps = {
				...compProps,
				...enhancements
			}
			return <Comp enhancedProps/>
		}
	}
*/

const ReactRoot = addButtsToProps(testComponent)

document.addEventListener('DOMContentLoaded', () => {
	render(
		h(ReactRoot, {first: 'success'}),
		document.getElementById('here')
	)	
})