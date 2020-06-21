const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
function authCheck(req, res, next) {
	if (!req.user) {
		res.redirect('/auth/login');
	} else {
		next();
	}
}
router.get('/', authCheck, (req, res) => {
	Blog.find({}).then((blogs) => {
		let privateBlogs = blogs.filter((blog) => {
			return blog.condition == 'private';
		});
		let publicBlogs = blogs.filter((blog) => {
			return blog.condition == 'public';
		});
		let blogsIWantToSend = [];
		//if we have any private blog
		if (privateBlogs.length > 0) {
			privateBlogs.forEach((blog) => {
				//if private blog is for the person who is logged in
				if (blog.googleId == req.user.googleId) {
					blogsIWantToSend.push(blog);
				}
			});
		}
		//if we have any public blog
		if (publicBlogs.length > 0) {
			publicBlogs.forEach((blog) => {
				blogsIWantToSend.push(blog);
			});
		}

		res.render('all-blogs', { blogs: blogsIWantToSend, googleId: req.user.googleId });
	});
});
router.post('/', authCheck, (req, res) => {});

module.exports = router;
