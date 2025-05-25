const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const API_URL = '/api/issues/apitest'
let id

suite('Functional Tests', function () {
    test('Create an issue with every field: POST request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post(API_URL)
            .set('Content-Type', 'application/json')
            .send({
                "issue_title": "Fix error in posting data",
                "issue_text": "When we post data it has an error.",
                "created_by": "Joe",
                "assigned_to": "Joe",
                "status_text": "In QA"
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.property(res.body, '_id')
                id = res.body._id
                done()
            })

    })

    test('Create an issue with only required fields: POST request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post(API_URL)
            .set('Content-Type', 'application/json')
            .send({
                "issue_title": "Fix error in posting data",
                "issue_text": "When we post data it has an error.",
                "created_by": "Joe"
            })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.property(res.body, '_id')
                assert.isEmpty(res.body.status_text)
                assert.isEmpty(res.body.assigned_to)
                done()
            })
    })

    test('Create an issue with missing required fields: POST request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .post(API_URL)
            .set('Content-Type', 'application/json')
            .send({ "issue_title": "Should return error" })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.property(res.body, 'error')
                done()
            })
    })

    test('View issues on a project: GET request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get(API_URL)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.isArray(res.body)
                done()
            })
    })

    test('View issues on a project with one filter: GET request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get(`${API_URL}?opne=true`)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.isArray(res.body)
                assert.isAtLeast(res.body.length, 1)
                done()
            })
    })

    test('View issues on a project with multiple filters: GET request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get(`${API_URL}?open=true&assigned_to=Joe`)
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.isArray(res.body)
                assert.isAtLeast(res.body.length, 1)
                done()
            })
    })

    test('Update one field on an issue: PUT request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .put(API_URL)
            .set('Content-Type', 'application/json')
            .send({ "_id": id, "issue_text": "Test edited." })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.property(res.body, '_id')
                assert.equal(res.body.result, 'successfully updated')
                done()
            })
    })

    test('Update multiple fields on an issue: PUT request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .put(API_URL)
            .set('Content-Type', 'application/json')
            .send({ "_id": id, "open": false, 'status_text': 'In QA' })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.property(res.body, '_id')
                assert.equal(res.body.result, 'successfully updated')
                done()
            })
    })

    test('Update an issue with missing _id: PUT request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .put(API_URL)
            .set('Content-Type', 'application/json')
            .send({ "open": true })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'missing _id')
                done()
            })
    })

    test('Update an issue with no fields to update: PUT request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .put(API_URL)
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'missing _id')
                done()
            })
    })

    test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .put(API_URL)
            .set('Content-Type', 'application/json')
            .send({ '_id': "not valid id", "open": true })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body._id, 'not valid id')
                done()
            })
    })

    test('Delete an issue: DELETE request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .delete(API_URL)
            .set('Content-Type', 'application/json')
            .send({ '_id': id })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.property(res.body, '_id')
                assert.equal(res.body.result, 'successfully deleted')
                done()
            })
    })

    test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .delete(API_URL)
            .set('Content-Type', 'application/json')
            .send({ "_id": "not valid id" })
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'could not delete')
                assert.equal(res.body._id, 'not valid id')
                done()
            })

    })

    test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', function (done) {
        chai
            .request(server)
            .keepOpen()
            .delete(API_URL)
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.equal(res.body.error, 'missing _id')
                done()
            })
    })
});
