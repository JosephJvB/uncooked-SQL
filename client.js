const render = require('react-dom').render
const h = require('react-hyperscript')

const testComponent = (props) => h('div', {}, [
	h('h1', {}, 'Coming to you live'),
	h('h3', {}, 'PROPS: '),
	props && h('ul', {}, [
		Object.keys(props).map(propKey => h('li', { key: propKey }, propKey + ': ' + props[propKey]))
	])
])

// Joe's fake react-redux connect()
const addButtsToProps = (mapper) => (component) => (componentProps) => {
	const fakeState = {
		pants: ['shorts', 'skirt', 'long-jacket'],
		warmButt: true,
	} // dunno how connect() gets access to state irl. Some magic with Provider and Store. To be discovered
	const buttProps = mapper(fakeState) // return bits of state that component asks for
	const nextProps = Object.assign({}, buttProps, componentProps)
	return h(component, nextProps)
}

/*
	function JoesFakeConnect(mapStateToProps) {
		return function enhanceCompnent(Comp) {
			return function renderCompWithNewProps(componentProps) {
				const state = getState() // PLACEHOLDER cos idk what goes on
				const enhancedProps = {
					...componentProps,
					...mapStateToProps(state)
				}
				return <Comp enhancedProps/>
			}
		}
	}
*/

const mapPantsToButts = (state) => ({
	butts: pants
})

const ReactRoot = addButtsToProps(mapPantsToButts)(testComponent)

document.addEventListener('DOMContentLoaded', () => {
	render(
		h(ReactRoot, {first: 'success'}),
		document.getElementById('here')
	)	
})