const pg = require('pg-promise')()

const DB = pg({
	host: 'localhost',
	port: 5432,
	database: 'boiler_base',
	user: 'postgres',
	password: 'postgres'
})

//console.log('D A T A B A S E', DB)

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

DB.one('select 1 + 1 as answer')
.then(res => {
	console.log(res.answer, DB.$pool)
	DB.$pool.end() // OH IT WORKS HERE
})
.catch(err => console.log('HELL NAW', err))
