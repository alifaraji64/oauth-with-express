const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./config/passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
app.use(express.urlencoded({ extended: true }));
// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		httpOnly: false,
		keys: [keys.session.cookieKey],
	})
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose
	.connect('mongodb://localhost:27017/oauth', {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		console.log('db connected');
	});

// set up routes
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/add-blog', require('./routes/add-blog'));
app.use('/all-blogs', require('./routes/all-blogs'));
app.use('/edit-blog', require('./routes/edit-blog'));

// create home route
app.get('/', (req, res) => {
	res.render('home', { user: req.user });
});

app.listen(process.env.PORT || 3000, () => {
	console.log('app now listening for requests on port 3000');
});
