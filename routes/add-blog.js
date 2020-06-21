const router = require('express').Router();
const Blog = require('../models/Blog');
function authCheck(req, res, next) {
	if (!req.user) {
		res.redirect('/auth/login');
	} else {
		next();
	}
}
router.get('/', authCheck, (req, res) => {
	res.render('add-blog');
});
router.post('/', authCheck, (req, res) => {
	const { title, condition, blog } = req.body;
	console.log(req.user);

	new Blog({ title, condition, blog, googleId: req.user.googleId, thumbnail: req.user.thumbnail }).save().then(() => {
		console.log('saved to db');
		res.redirect('/all-blogs');
	});
});

module.exports = router;
