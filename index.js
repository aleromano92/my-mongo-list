var MongoClient = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

function MyModule(dbConn) {
    if (!(this instanceof MyModule))
        return new MyModule(dbConn);

    this.dbConnection = dbConn;
}

MyModule.prototype.save = function (params, callback) {
    var collection = this.dbConnection.collection('Lists');
    collection.insert(params, function (err, records) {
        console.log('Added ' + records.length + ' records');
        callback(null, records);
    });
}

MyModule.prototype.loadAll = function (callback) {
    var collection = this.dbConnection.collection('Lists');
    var me = this;
    collection.find().toArray(function (err, results) {
        callback(err, results);
    });
}

MyModule.prototype.load = function (idToFind, callback) {
    var collection = this.dbConnection.collection('Lists');
    var me = this;

    collection.findOne({_id: new ObjectID(idToFind)}, function(err, todo){
        callback(err, todo);
    });
}

MyModule.prototype.delete = function (idToDelete, callback) {
    var collection = this.dbConnection.collection('Lists');
    var me = this;

    collection.remove({_id: new ObjectID(idToDelete)}, function(err, todo){
        if(err){
            console.log(err);
        }
        else
            callback(err, "DELETED");
    });
}


module.exports = MyModule;
