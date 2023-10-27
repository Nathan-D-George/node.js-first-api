const express = require('express');
const app     = express();
const path    = require('path');
const errorHandler = require('./middleware/errorHandler');

const port = process.env.PORT || 3000;

app.use( express.json() );

/*      add routes here     */
app.use('/',       express.static(path.join(__dirname, '/public')));
app.use('/about2', express.static(path.join(__dirname, '/public')));
app.use('/login',  express.static(path.join(__dirname, '/public')));

app.use('/',      require('./routes/rootRoutes' ));
app.use('/about', require('./routes/aboutRoutes'));
app.use('/login', require('./routes/sessionRoutes'));
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

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
