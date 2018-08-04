const pg = require('pg-promise')()
const {
	onFailure,
	onSuccess,
} = require('./util')

const DB = pg({
	host: 'localhost',
	port: 5432,
	database: 'boiler_base',
	user: 'postgres',
	password: 'postgres'
})

//console.log('D A T A B A S E', DB)
oneSmallStep()
//oneGiantLeap()
//shouldBeSleeping({ column: 'name', value: 'Petra' })

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
	.then(onSuccess(DB))
	.catch(onFailure(DB)) // this function gets called even though it's in the catch block??
	/*
		I wanted to be fancy and curry some functions, 
		call function with db connection,
		that function returns aother function that will deal with .then -> res or .catch -> err
		except both functions get called initially...
		I would have thought hiding them in .then() .catch() meant they wouldnt get called tbh
	*/
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