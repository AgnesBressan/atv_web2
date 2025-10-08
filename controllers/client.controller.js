import model from "../models/client.model.js"

function findAll(request, response) {
  model.findAll().then(function (res) {
      response.json(res).status(200)
    }).catch(function (err) {
      response.json(err).status(500)
    })
}

function findById(request, response) {
  model.findByPk(request.params.id)
    .then(function (res) {
      response.json(res).status(200)
    })
    .catch(function (err) {
      response.json(err).status(500)
    })
}

function create(request, response) {
  model.create({
      name: request.body.name,
      document: request.body.document,
    })
    .then(function (res) {
      response.json(res).status(201)
    })
    .catch(function (err) {
      response.json(err).status(500)
    })
}

function deleteByPk(request, response) {
  model
    .destroy({ where: { id: request.params.id } })
    .then(function (res) {
      response.status(200).send()
    })
    .catch(function (err) {
      response.json(err).status(500)
    })
}

function update(request, response) {
  model
    .update(
      {
        name: request.body.name,
        document: request.body.document,
      },
      { where: { id: request.params.id } },
    )
    .then(function (res) {
      response.status(200).send()
    }).catch(e =>  {
      response.json(e).status(500)
    })
}

export default { findAll, findById, create, deleteByPk, update }
