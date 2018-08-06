### HOC's
- specifically Redux's connect function:

*DISCLAIMER:* This is all major guesswork. I know the source code would very different. I'm interested in thinking about the general functionality of the things
- feeling OK about how connect gives a component it's props
- feeling sketchy about how connect gets to the store (aka: how the Provider component operates)

I guess what Redux's connect does is it passes the combined reducer into your mapStateToProps callback
- actually it must get passed the store from the `<Provider store={store} />`
- yikes, hadn't thought about how that part worked..

Connect:
```js
	const state = require('./combined-reducer')
	
	function connect(mapStateToProps) {
		return (Component) => {
			return (componentProps) => {
				const nextProps = {
					...componentProps,
					...mapStateToProps(state, componentProps) // im pretty sure callback passed to connect gets state and props
				}
				return <Component nextProps />
			}
		}
	}
```

Provider:
```js
function Provider(props) {
	const childrenWithStore = props.children.map((child) => {
		if(child.isConnected) /* yeah look I dont know OK */ {
			child.props = {
				...child.props, // old props
				...props.store // store is now available.. ??
			}
		}
		return child
	})
	return [...childrenWithStore]
}
```
Found this on how you might look at state, from here: https://stackoverflow.com/questions/38986366/accessing-redux-store-inside-functions
![howToGetState](http://oi67.tinypic.com/125mc7p.jpg)
Another:
![another1](http://oi64.tinypic.com/5yrno1.jpg)

...aaaand Im reading the react-redux source code, this has been a helluva ride I'm loving it