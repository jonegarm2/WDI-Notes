const User = require('./../models/user');

function create(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        user.posts.push({ content: req.body.content, category: req.body.category});
        user.save(function(err) {
            res.redirect(`/users/${user._id}`);
        });
    })
}

function destroy(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        user.posts.id(req.params.post_id).remove();
        user.save(function(err) {
            res.redirect('/users');
        })
    })
}

module.exports = {
    create, 
    destroy
};