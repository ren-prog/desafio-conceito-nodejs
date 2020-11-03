const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO

  const { id } = request.params;

  const { title, url, techs } = request.body;

  const index = repositories.findIndex((repo) => repo.id === id);

  if (index === -1) {
    return response.status(400).json({ message: "Repository not found" });
  }
  const repositorio = {
    id,
    title,
    url,
    techs,
    likes: repositories[index].likes,
  };

  repositories[index] = repositorio;

  return response.json(repositorio);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  const { id } = request.params;

  const index = repositories.findIndex((repo) => repo.id === id);

  if (index === -1) {
    return response.status(400).json({ message: "Repository not found" });
  }

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const { id } = request.params;

  const index = repositories.find((repo) => repo.id === id);

  if (!index) {
    return response.status(400).json({ message: "Repository not found" });
  }

  index.likes++;

  return response.json(index);
});

module.exports = app;
