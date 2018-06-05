const db = require('./../db/db');

const modelMethods = {
    primaryKey: 1, 

    addShoe: function(name, year, description) {
        let newShoeEntry = {
            id: this.primaryKey, 
            name, 
            year, 
            description
        };

        db[this.primaryKey] = newShoeEntry;
        this.primaryKey++;
    },

    // ActiveRecord equivalent: Shoe.all
    getAllShoes: function() {
        return db;
    }, 

    // ActiveRecord equivalent: Shoe.find(id)
    getShoe: function(id) {
        return db[id];
    }, 

    updateShoe: function(id, name, year, description) {
        db[id].name= name;
        db[id].year = year;
        db[id].description = description;
    }, 

    deleteShoe: function(id) {
        delete db[id];
    }
    
};

module.exports = modelMethods;