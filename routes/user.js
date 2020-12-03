var express = require('express');
var router = express.Router();
var login = require('../controller/authenticate/login');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('user',{error: true});
});

router.post('/user', function(req, res, next){ 
    var userInfo = req.body; 
    //Get the parsed information 
    if(!userInfo.name || !userInfo.cgpa || !userInfo.course || !userInfo.email || !userInfo.password){ 
    res.render('show_message', { message: "Sorry, you provided worng info", type: "error"}); 
    } else { 
    var newUser = new User({ name: userInfo.name, cgpa: userInfo.cgpa, course: userInfo.course, email: userInfo.email, password: userInfo.password }); 
    newUser.save(function(err, user){ 
    if(err) res.render('show_message', {message: "Database error", type: "error"}); 
    else res.render('show_message', { message: "New user added", type: "success", user: userInfo}); 
    
        }); 
    }
});
module.exports = router;