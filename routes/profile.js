const router = require('express').Router();

function authCheck(req, res, next) {
	if (!req.user) {
		res.redirect('/auth/login');
	} else {
		next();
	}
}
router.get('/', authCheck, (req, res) => {
	res.render('profile', { user: req.user });
});
router.get('/hello', (req, res) => {
	res.send('hello');
});

module.exports = router;
