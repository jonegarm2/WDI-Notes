const User = require('./../models/user');

function index(req, res) {
    User.find({}, function(err, doc) {
        res.render('users/index', { users: doc });    
    })
}

function newUser(req, res) {
    res.render('users/new')
}

function create(req, res) {
    User.create({ 
        name: req.body.name, 
        age: req.body.age
    }, function(err, doc) {
        if (err) return res.render('users/new');
        res.redirect('/users')
    })
}

function show(req, res) {
   User.findById(req.params.id, function(err, doc){
       if (err) return res.render('users/new');
       res.render('users/show', { user: doc })
   })
}

module.exports = {
    newUser, 
    create, 
    show, 
    index
};