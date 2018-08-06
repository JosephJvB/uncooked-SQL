const render = require('react-dom').render
const h = require('react-hyperscript')

// lil component that receives props and renders each prop in a list
const testComponent = (props) => h('div', {}, [
	h('h1', {}, 'Coming to you live'),
	h('h3', {}, 'PROPS: '),
	props && h('ul', {}, [
		Object.keys(props).map(propKey => h('li', { key: propKey }, propKey + ': ' + props[propKey]))
	])
])

// Joe's fake react-redux connect()
const enhancer = (mapper) => (component) => (componentProps) => {
	// dunno how connect() gets access to state irl. Some magic with Provider and Store. To be discovered
	const fakeState = {
		pants: ['shorts', 'skirt', 'long-jacket'],
		favSong: 'ra ra rasputin'
	}
	// return bits of state that component asks for
	const propsFromState = mapper(fakeState)
	// mash exisitng props with requested props
	const enhancedProps = Object.assign({}, propsFromState, componentProps)
	// serve at room temperature with a sprig of parsley
	return h(component, enhancedProps)
}

/*
	function JoesFakeConnect(mapStateToProps) {
		return function enhanceComponent(Comp) {
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

// choose the bits of 'state' that you want
const mapPantsToProps = (state) => ({ pants: state.pants })

// mash everything together
const ReactRoot = enhancer(mapPantsToProps)(testComponent)

// render the mashup. A la classic react style
document.addEventListener('DOMContentLoaded', () => {
	render(
		h(ReactRoot, {first: 'success'}),
		document.getElementById('here')
	)	
})