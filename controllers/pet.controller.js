import model from "../models/pet.model.js"
import Client from "../models/client.model.js"
import mediaUploader from "../media/media.uploader.js"

function findAll(request, response) {
  model
    .findAll()
    .then(function (results) {
      getAllPhotos(results).then(() => response.json(results).status(200))
    })
    .catch(function (err) {
      response.json(err).status(500)
    })
}

function getPhotoUrl(photoName) {
  return mediaUploader.getFileUrl(photoName)
}

async function getAllPhotos(results) {
  for(let result of results) {
    let photoUrl = await getPhotoUrl(result.dataValues.photo)
    result.dataValues.photo = photoUrl
  }
}

function findById(request, response) {
  model
    .findByPk(request.params.id, { include: Client })
    .then(function (res) {
        getPhotoUrl(res.dataValues.photo).then(function(photoUrl) {
          res.dataValues.photo = photoUrl 
          response.json(res).status(200)
        })
    })
    .catch(function (err) {
      response.json(err).status(500)
    })
}

function findByClientId(request, response) {
  model
    .findAll({ where: { ClientId: request.params.id } })
    .then(function (results) {
      getAllPhotos(results).then(() => response.json(results).status(200))
    })
    .catch((e) => response.json(e).status(500))
}

function create(request, response) {
  model
    .create({
      name: request.body.name,
      type: request.body.type,
      breed: request.body.breed,
      birth: request.body.birth,
      photo: request.file.key,
      ClientId: request.body.ClientId,
    })
    .then(function (res) {
      getPhotoUrl(res.dataValues.photo).then(function(photoUrl) {
          res.dataValues.photo = photoUrl 
          response.json(res).status(201)
        })      
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
        type: request.body.type,
        breed: request.body.breed,
        birth: request.body.birth,
        photo: request.body.photo,
        ClientId: request.body.ClientId,
      },
      { where: { id: request.params.id } },
    )
    .then(function (res) {
      response.status(200).send()
    })
    .catch((e) => {
      response.json(e).status(500)
    })
}

export default {
  findAll,
  findById,
  create,
  deleteByPk,
  update,
  findByClientId,
}
