function onSuccess(db) {
	console.log('on succ')
	return function handleRes(result) {
		db.$pool.end() // close DB ASAP rocky
		console.log('yassss queen', result)
	}
}

function onFailure(db) {
	console.log('on fail')
	return function handleError(error) {
		console.log('yoikes', error)
		db.$pool.end()
	}
}

module.exports = {
	onFailure,
	onSuccess,
}