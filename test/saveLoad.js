var assert = require('assert'),
    MongoClient = require('mongodb').MongoClient,
    clean = require('mongo-clean'),
    myModule = require('../');

describe('Connection', function () {

    var db;
    var instance;

    beforeEach(function (done) {
        MongoClient.connect('mongodb://localhost/test', function (err, mdb) {
            db = mdb;
            instance = new myModule(db);
            clean(db, done);
        });
    });

    describe('#save()', function () {
        it('should insert and then find one todo', function (done) {
            instance.save({
                    name: 'Lista1',
                    elements: [{
                            text: ' Fai questo',
                            done: false
                        }
                    ]
                },
                function (err, todos) {
                    instance.loadAll(function (err, res) {
                        assert.equal(1, res.length);
                        done();
                    });
                });
        });
    });

    describe('#update()', function () {
        it('should ', function (done) {
            instance.save({
                    name: 'Lista1',
                    elements: [{
                            text: ' Fai questo',
                            done: false
                        }
                    ]
                },
                function (err, todos) {
                    instance.loadAll(function (err, res) {
                        assert.equal(1, res.length);
                        done();
                    });
                });
        });
    });

    describe('#load()', function () {
        var idSaved;
        beforeEach(function (done) {
            instance.save({
                    name: 'Lista1',
                    elements: [{
                            text: ' Fai questo',
                            done: false
                        }
                    ]
                },
                function (err, todo) {
                    idSaved = todo[0]._id;
                    done();
                });
        });

        it('should find the id I have saved', function (done) {
            instance.load(idSaved,
                function (err, todo) {
                    assert.equal(idSaved.toString(), todo._id.toString());
                    done();
                });
        });
    });

    describe('#delete()', function () {
        var idToDelete;
        beforeEach(function (done) {
            instance.save({
                    name: 'Lista1',
                    elements: [{
                            text: ' Fai questo',
                            done: false
                        }
                    ]
                },
                function (err, todo) {
                    idToDelete = todo[0]._id;
                    done();
                });
        });

        it('should return the DELETE string', function (done) {
            instance.delete(idToDelete, function (err, todo) {
                assert.equal("DELETED", todo);
                done();

            });
        });

        it('should not find the id I have deleted', function (done) {
            instance.delete(idToDelete, function (err, todo) {
                instance.load(idToDelete,
                    function (err, todo) {
                        assert.equal(undefined, todo);
                        done();
                    });
            });
        });
    });



});
