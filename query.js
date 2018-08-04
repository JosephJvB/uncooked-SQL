const pg = require('pg-promise')()
const handleResult = require('./util')

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
//shouldBeSleeping({ column: 'name', value: 'Pratik' })
//deleteByName('trev')
//deleteById(3)

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
	.then(handleResult({db: DB, type: 'SUCCESS'}))
	.catch(handleResult({db: DB, type: 'FAILURE'})) // this function gets called even though it's in the catch block??
/*
	I wanted to be fancy and curry some functions, 
	call function with db connection,
	that function returns aother function that will deal with .then -> res or .catch -> err
	except both functions get called initially...
	I would have thought hiding them in .then() .catch() meant they wouldnt get called tbh
	I guess they still get evaluated
*/
}

function oneGiantLeap() {
/*
	use backticks to wrap statement string so I can use both "" and '' in the SQL statement 😘
	otherwise I have to use gross escape characters = 'statement + \'stringVALUE\'' === yuck
*/
	DB.one(`insert into "Birds"(name) values('westren petrel') returning name`)
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
/* 
	this syntax is called a prepared statement:
	aparently its best used around v complex queries - so defintely doesnt make sense here
*/
	DB.one({
		name: 'create-bird',
		text: `insert into "Birds"(${column}) values('${value}') returning *`,
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

function deleteByName(birdName) {
	DB.one(`delete from "Birds" where "name" ~ '${birdName}' returning *`)
	.then(handleResult({db: DB, type: 'DELETED'}))
	.catch(handleResult({db: DB, type: 'DELETE ERROR'}))
}

/*
	different functions for different syntax:
	'column ~ value' = is-like. Doesnt work for id as an integer
	'column = value' = is exactly. I like the idea of not having to match on exact strings

	COULD have one delete function that switches on type of input:
	if(string) use ~
	if(number) use =
	...dunno if i like that tho

	problem: these queries don't handle multiple deletes
*/

function deleteById(birdId) {
	DB.one(`delete from "Birds" where id = ${birdId} returning *`)
	.then(handleResult({db: DB, type: 'DELETED'}))
	.catch(handleResult({db: DB, type: 'DELETE ERROR'}))
}
