'use strict';

const IssueHandler = require('../controller/issue-handler')

const issueFetch = new IssueHandler()

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(async function (req, res) {
      let project = req.params.project;
      let query = req.query
      let { status, result } = await issueFetch.get(project, query)
      res.status(status).json(result)
    })

    .post(async function (req, res) {
      let project = req.params.project;
      let { body } = req

      if (project && body) {
        let { status, result } = await issueFetch.post(project, body)
        res.status(status).json(result)
      } else {
        res.status(404).send('Not found')
      }
    })

    .put(async function (req, res) {
      let project = req.params.project;
      let { body } = req

      if (project) {
        let { status, result } = await issueFetch.put(project, body)
        res.status(status).json(result)
      } else {
        res.status(404).send('Not found')
      }
    })

    .delete(async function (req, res) {
      let project = req.params.project;
      let { _id } = req.body

      if (project) {
        let { status, result } = await issueFetch.delete(project, _id)
        res.status(status).json(result)
      } else {
        res.status(404).send('Not found')
      }
    });

};
