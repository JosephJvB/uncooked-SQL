/* 
	forEach is a synchonous thing: you call it, then the next thing gets called.
	but what if you only want to call the next thing after each item has be called in the forEach?
	...maybe you can just use a for-loop, but what if Im dumb and only thought of that now...
	Disclaimer that I found this on stack overflow :)
	this is more to record it for myself.

	but yeah, I think maybe the humble for-loop would also do this task.
	As seen in the setup. EH WHATEVER it's good to learn new things even if they're weird.
*/

const donutArray = []

for(let i = 0; i < 10000000; i++) {
	donutArray.push('donut') // create super long array to mimic forEach delayed execution
}

asyncForEach(donutArray).then(console.log)

function asyncForEach(arr) {
	return new Promise((resolve, reject) => {
		arr.forEach((donut, i) => {
		// at last item, resolve
			if(i === arr.length - 1) resolve('we done here') 
		})		
	})
}