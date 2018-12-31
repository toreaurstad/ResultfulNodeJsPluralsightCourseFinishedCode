var should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose');
var app = require('../app.js');

var Book = mongoose.model('Book');
var agent = request.agent(app);

describe('Book Crud Test ', function () {
    it('Should allow a book to be posted and return a read and _id', function (done) {
        var bookPost = { title: 'new Book', author: 'Jon', genre: 'Fiction' };

        agent.post('/api/books').send(bookPost).expect(200).end(function (err, results) {
            console.log('posting: ' + bookPost);
            results.body.read.should.equal(false);
            results.body.should.have.property('_id');
            done();
        })

        afterEach(function (done) {
            Book.deleteOne().exec();
            done();
        })

    })

});