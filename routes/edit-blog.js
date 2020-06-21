const router = require('express').Router();
const Blog = require('../models/Blog');
function authCheck(req, res, next) {
	if (!req.user) {
		res.redirect('/auth/login');
	} else {
		next();
	}
}
router.get('/:id', authCheck, (req, res) => {
	let id = req.params.id;
	//console.log(id);
	Blog.findById(id, (err, blog) => {
		if (err) throw err;
		console.log(blog);

		res.render('edit-blog', { blog });
	});
});
router.post('/:id', authCheck, (req, res) => {
	const { title, condition, blog } = req.body;
	Blog.findOneAndUpdate({ _id: req.params.id }, { $set: { title: title, blog: blog } }, (err, blog) => {
		if (err) throw err;
		console.log(blog);
	}).then(() => {
		console.log('blog updated');
		res.redirect('/all-blogs');
	});
});

module.exports = router;
