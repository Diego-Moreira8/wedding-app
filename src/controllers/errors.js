/** @type {import("express").RequestHandler} */
const notFound = (req, res, next) => {
  res.status(404).render("layout", {
    template: "errors",
    errorMessage: "Página não encontrada.",
  });
};

/** @type {import("express").ErrorRequestHandler} */
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).render("layout", {
    template: "errors",
    errorMessage: "Erro interno do servidor.",
  });
};

module.exports = { notFound, errorHandler };
