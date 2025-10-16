import model from "../models/client.model.js"

function handleError(response, err, statusCode = 500, message = "Erro interno do servidor.") {
    console.error(`Erro no Cliente Controller (Status ${statusCode}):`, err);
    response.status(statusCode).json({
        message: message,
        errorDetails: err.message || JSON.stringify(err)
    });
}

function findAll(request, response) {
  model.findAll()
    .then(function (res) {
      response.status(200).json(res);
    })
    .catch(function (err) {
      handleError(response, err, 500, "Falha ao buscar a lista de clientes.");
    });
}

function findById(request, response) {
  model.findByPk(request.params.id)
    .then(function (res) {
      response.status(200).json(res);
    })
    .catch(function (err) {
      handleError(response, err, 500, "Falha ao buscar o cliente por ID.");
    });
}

function create(request, response) {
  model.create({
      name: request.body.name,
      document: request.body.document,
    })
    .then(function (res) {
      response.status(201).json(res);
    })
    .catch(function (err) {
      handleError(response, err, 500, "Falha ao cadastrar o novo cliente.");
    });
}

function deleteByPk(request, response) {
  model
    .destroy({ where: { id: request.params.id } })
    .then(function (res) {
      response.status(200).send();
    })
    .catch(function (err) {
      handleError(response, err, 500, "Falha ao deletar o cliente.");
    });
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
      response.status(200).send();
    })
    .catch(e =>  {
      handleError(response, e, 500, "Falha ao atualizar o cliente.");
    });
}

export default { findAll, findById, create, deleteByPk, update }