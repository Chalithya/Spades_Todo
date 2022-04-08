const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const coockieParser = require('cookie-parser');
const routes = require('./routes/routes');
const todoRoutes = require('./routes/todoRoutes');
const connectionOptions = { useUnifiedTopology: true, useNewUrlparser: true, useFindAndModify: false };
const { requireAuth } = require('./middleware/authMiddleware')


// Database connection URL
mongoose.connect('mongodb://localhost/spades', {
    useNewUrlparser: true,
    useUnifiedTopology: true
});



mongoose.connect('mongodb://localhost/spades')
    .then(() => console.log('Connected to databse'))
    .catch((err) => console.error(err))

app = express();

app.use(coockieParser());

//Prevent making errors when port is not available
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'] //For react
}));

//app.use(cors());

app.use(express.json());

app.use('/api', routes);

//app.use('/todos', requireAuth, todoRoutes);
app.use('/todos', todoRoutes);

app.listen(8000);
