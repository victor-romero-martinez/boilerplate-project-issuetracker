'use strict';

const Issue = require('../utils/issue-fetch')

const issueFetch = new Issue

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(async function (req, res) {
      let project = req.params.project;
      let result = await issueFetch.get(project)
      res.json(result)
    })

    .post(async function (req, res) {
      let project = req.params.project;
      let { body } = req

      if (project && body) {
        let result = await issueFetch.post(project, body)
        res.json(result)
      } else {
        res.status(404).send('Not found')
      }
    })

    .put(async function (req, res) {
      let project = req.params.project;
      let { body } = req

      if (project && body._id) {
        let result = await issueFetch.put(project, body)
        res.json(result)
      } else {
        res.status(404).send('Not found')
      }
    })

    .delete(async function (req, res) {
      let project = req.params.project;
      let { _id } = req.body

      if (project && _id) {
        let result = await issueFetch.delete(project, _id)
        res.json(result)
      } else {
        res.status(404).send('Not found')
      }
    });

};
