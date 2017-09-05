var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const promisify = require('es6-promisify');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const fs = require('fs');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// APIs


const Books = require('./models/books.js');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/bookshop', {
//     useMongoClient: true
// });
mongoose.connect('mongodb://testUser:test@ds125914.mlab.com:25914/bookstore', {
    useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));


// ---->>> SET UP SESSION <<<------ (middleware to capture sessions and save to mongoDB)
app.use(session({
    secret: 'mySecretString',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
    store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
    //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}));

//SAVE TO SESSION
app.post('/cart', function (req, res) {
    var cart = req.body;

    req.session.cart = cart;
    req.session.save(function (err) {
        if (err) {
            throw err
        }
        res.json(req.session.cart);
    });

});
// GET SESSION CART API

app.get('/cart', function (req, res) {
    if (typeof req.session.cart !== 'undefined') {
        res.json(req.session.cart);
    }
});

// ----->>>> END SESSIONS SET UP <<<<<-----


//----->> POST BOOKS <<<---------
app.post('/books', function (req, res) {
    var book = req.body;

    Books.create(book, function (err, books) {
        if (err) {
            throw err;
        }
        res.json(books);
    })
});


//.------->> GET BOOKS <<--------

app.get('/books', function (req, res) {
    Books.find(function (err, books) {
        if (err) {
            console.error('# API GET BOOKS', err);
        }
        res.json(books);
    });
});

// -------->>>DELETE BOOKS<<<-----------

app.delete('/books/:_id', function (req, res) {
    var query = {_id: req.params._id};

    Books.remove(query, function (err, books) {
        if (err) {
            console.error('# API DELETE BOOKS', err);
        }
        res.json(books);
    })
});


// -------->>>UPDATE BOOKS <<<-----------

app.put('/books/:id', function (req, res) {

    var book = req.body;
    var query = req.params._id;

    var update = {
        '$set': {
            title: book.title,
            description: book.description,
            image: book.image,
            price: book.price
        }
    };

    //When true returns the updated document
    var options = {new: true};

    Books.findOneAndUpdate(query, update, options, function (err, books) {
        if (err) {
            throw err;
        }
        res.json(books);

    });
});

/// -----> GET BOOK IMAGES API <---------//
app.get('/images', function (req, res) {
    const imgFolder = __dirname + '/public/images/';

    //READ ALL FILES IN THE DIRECTORY
    fs.readdir(imgFolder, function (err, files) {
        if (err) {
            return console.error(err);
        }
        //CREATE AN EMPTY ARRAY
        const filesArr = [];

        //ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE ARRAY
        files.forEach(function (file) {
            filesArr.push({name: file})
        });
        //SEND THE JSON RESPONSE WITH THE ARRAY
        res.json(filesArr);
    })


});


app.listen(3001, function (err) {
    if (err) {
        return console.log('3001 api error: ', err);
    }
    console.log('API Server is listening on http://localhost:3001')
});
// END


