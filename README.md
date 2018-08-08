# Joe tries:
- SQL-in-js using pg-promise library
- Learning HOC's, injecting props into react components

Oh and Im doing it all from a terminal-editor called Micro for the sake of trying new things.
![Micro](http://oi67.tinypic.com/156z69e.jpg)

Hey maybe I should be using this library, I like its docs https://node-postgres.com/features/pooling

From the SQL functions I'm writing I wanna make a web-app that is a database GUI
- write all the backend-endpoints first.
- create a UI that can indicate state of database: redux-persist-middleware + moneyclip
- draw some wireframes even, that would be a fun change of pace for workflow
- maybe even have it as a learning thing so you can select options from the GUI and it will tell you the SQL command you just executed
- I think I have to set this repo behind now as a sandbox - but then for the real thing I'd like to work in less messy files haha.
**THUS THE SQL-KITCHEN WAS BORN**

It's amazing how slow going it is to get anything at all. I made so many dumb moves just getting pg-promise to respond to me with 1+1.
I was trying the npm package mysql first.. but I have a bunch of psql things already on my machine so I said what the hell and used a pg library instead.
Ah so in retrospect, the mysql package didnt work so well since I dont have a mysql database to establish a connection to. That makes sense
