const model = require('./../models/Shoe');

module.exports = shoesController = {

    index: function(req, res) {
        res.render('shoes/index', { shoes: model.getAllShoes() });
    }, 

    new: function(req, res) {
        res.render('shoes/new');
    },

    create: function(req, res) {
        // Step 1: Add HTTP body to DB
       model.addShoe(req.body.shoeName, req.body.shoeReleaseYear, req.body.shoeDescription);

        // Step 2: Redirect to /shoes
        res.redirect('/shoes');
    }, 

    destroy: function(req, res) {
        // Want to use deleteShoe 
        model.deleteShoe(req.params.id);
        res.redirect('/shoes')
    },

    edit: function(req, res) {
        let editShoe = model.getShoe(req.params.id);
        res.render('shoes/edit', { shoe: editShoe });
    }, 

    update: function(req, res) {
        console.log('hello');
        let body = req.body;
        model.updateShoe(req.params.id, body.shoeName, body.shoeReleaseYear, body.shoeDescription);
        console.log(model.getAllShoes())
        res.redirect('/shoes');
    }, 

    show: function(req, res) {
        res.render('shoes/show', { shoe:  model.getShoe(req.params.id) });
    }

}