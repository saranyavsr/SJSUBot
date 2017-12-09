var express = require('express');
var router = express.Router();

// Get Homepage

router.get('/', function(req, res){
	res.render('landingpage', {layout: false});
	// res.render('index', function(err, result) {
	//     // render on success
	//     if (!err) {
	//         res.send(result);
	//     }
	//     // render or error
	//     else {
	//         res.end('An error occurred');
	//         console.log(err);
	//     };
	// });
});

router.get('/bot', function(req, res){
	res.render('bot', {layout: 'other'});
});

// AdminLogin
router.get('/adminlogin', function(req, res){
	res.render('adminlogin');
});

router.post('/adminlogin', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	if(username == "admin@sjsu.edu" && password == "123"){
		res.render("register");
	}
});

// Register
router.get('/register', function(req, res){
	res.render('register', {layout :'other'});
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var student_id = req.body.student_id;
	var courses_completed = req.body.courses_completed;
	var courses_remaining = req.body.courses_remaining;
	var credits = req.body.credits;
	var due_assignments = req.body.due_assignments;
	var due_fees = req.body.due_fees;
	var gpa = req.body.gpa;
	var upcoming_quizes = req.body.upcoming_quizes;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,	
			email:email,
			password: password,
			student_id : student_id,
			courses_completed : courses_completed,
			courses_remaining : courses_remaining,
			credits : credits,
			due_assignments : due_assignments,
			due_fees : due_fees,
			gpa : gpa,
			upcoming_quizes : upcoming_quizes
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');
		// res.redirect('/users/login');
		res.redirect('/');
	}
});



function ensureAuthenticated(req, res, next){
	// if(req.isAuthenticated()){
	// 	return next();
	// } else {
	// 	//req.flash('error_msg','You are not logged in');
	// 	res.redirect('/users/login');
	// }
}

module.exports = router;