const pg = require('pg-promise')()

const DB = pg({
	host: 'localhost',
	port: 5432,
	database: 'boiler_base',
	user: 'postgres',
	password: 'postgres'
})

//console.log('D A T A B A S E', DB)
//oneSmallStep()
//oneGiantLeap()
shouldBeSleeping({
	column: 'name',
	value: 'Petra'
})

/*
	close DB conn: https://github.com/vitaly-t/pg-promise#library-de-initialization
	I couldn't figure out how to close DB connection here..
	BUT it worked on DB.one() so :shrug:

	DB.connect()
	.then((res) => {
		console.log(res)
		//DB.$pool.end() trying to figure out how to close connection to the db
	})
	.catch(res => console.log(res))
*/

function oneSmallStep() {
	DB.one('select 1 + 1 as answer')
	.then((res) => {
		console.log(res.answer, DB.$pool)
		DB.$pool.end() // OH IT WORKS HERE
	})
	.catch((err) => {
		console.log('HELL NAW', err)
		DB.$pool.end()
	})
}

function oneGiantLeap() {
	DB.one('insert into "Birds"(name) values(\'westren petrel\') returning name')
	.then((res) => {
		console.log(res, 'noice')
		DB.$pool.end()		
	})
	.catch((err) => {
		console.log('GOOD GRACIOUS', err)
		DB.$pool.end()
	})
}

function shouldBeSleeping({column, value}) {
	DB.one({
		name: 'create-bird',
		text: `insert into "Birds"(${column}) values('${value}') returning ${column}`,
	})
	.then((res) => {
		DB.$pool.end()
		console.log('whooo?', res)
	})
	.catch((err) => {
		DB.$pool.end()
		console.log('YIKES:', err)
	})
}