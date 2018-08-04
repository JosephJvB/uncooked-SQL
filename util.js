module.exports = function handleResult({db, type}) {
// im abusing scope here - db visible throughout this function.
	return function logResultAndClose(result) {
		db.$pool.end()
		console.log(type, ':', result)
	}
}