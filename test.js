function curryTest() {
	console.log('FIRST')
	return () => console.log('SECOND')
}

curryTest()()