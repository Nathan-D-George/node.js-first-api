require('dotenv').config();
const express = require('express');
const app     = express();
const path    = require('path');
const errorHandler  = require( './middleware/errorHandler' );
const mongoose      = require( 'mongoose' );
const connectDB     = require( './config/dbConnection' );
const { logger }    = require( './middleware/logger'   );
const port = process.env.PORT || 3000;

/*      connect to mongo db    */
connectDB();

/*     custom middleware logger     */
app.use(logger);

/* built-in middleware to handle urlencoded data
 * in other words, form data:
 *'content-type': application/x-www-form-urlencoded */
app.use(express.urlencoded( { extended: false } ) );

/*     middleware for json - javascript object notation   */
app.use( express.json() );

/*     add routes here     */
/*  app.use('/',         express.static(path.join(__dirname, '/public')));    */
app.use('/about',    express.static(path.join(__dirname, '/public'))); 
app.use('/sessions', express.static(path.join(__dirname, '/public'))); 
app.use('/shows',    express.static(path.join(__dirname, '/public'))); 

app.use('/',      require('./routes/rootRoutes' ))  ;  
app.use('/about', require('./routes/aboutRoutes'))  ;  
app.use('/login', require('./routes/sessionRoutes'));  
app.use('/shows', require('./routes/showRoutes'))   ;   
app.use('/users', require('./routes/userRoutes'))   ;
app.all('*', (req, res) => { 
    res.status(404); 
    if (req.accepts('html')){ 
      res.sendFile(path.join(__dirname, 'views', '404.html')); 
    } else if (req.accepts('json')){ 
      res.json({ "error": "404 Not Found"}); 
    } else { 
      res.type('txt').send("404 Not Found"); 
    } 
  } 
); 

app.use(errorHandler); 

mongoose.connection.once('open', () => { 
  console.log("Connected to MongoDB");   
  app.listen( port, () => console.log(`Server running on http://localhost:${port}`) ); 
}); 
