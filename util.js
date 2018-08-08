module.exports = function handleResult({db, type}) {
// im abusing scope here - db visible throughout this function.
	return function logResultAndClose(result) {
		db.$pool.end()
		console.log(type, ':', result)
	}
}

/*
	***in query.js***	
	db.one('do sql')
	.then(res => util({DB, type: 'SOME_TYPE', result: res}))
	.catch(err => util({DB, type: 'ERROR', result: err}))
*/

function betterUtil({DB, type, result}) {
	db.$pool.end()
	return console.log(type + ':', result)
}