const anecdotesRouter = require("express").Router();
const Anecdote = require("../models/anecdote");
const User = require("../models/user");
const logger = require("../utils/logger");
const mw = require("../utils/middleware");

const OK = global.HttpStatus.OK.code;
const CREATED = global.HttpStatus.CREATED.code;
const BAD_REQUEST = global.HttpStatus.BAD_REQUEST.code;
const NO_CONTENT = global.HttpStatus.NO_CONTENT.code;
const FORBIDDEN = global.HttpStatus.FORBIDDEN.code;
const NOT_FOUND = global.HttpStatus.NOT_FOUND.code;

const getAllAnecdotes = async (request, response) => {
  // noinspection JSCheckFunctionSignatures
  const anecdotes = await Anecdote.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(anecdotes);
};

const getAnecdote = async (request, response) => {
  const anecdote = await Anecdote.findById(request.params.id);
  if (anecdote) {
    response.json(anecdote);
  } else {
    response.status(NOT_FOUND).end();
  }
};

const addAnecdote = async (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(BAD_REQUEST.code).json({
      error: "content missing",
    });
  }

  const user = await User.findById(request.user.id);
  body.user = user.id;
  const anecdote = new Anecdote(body);

  // noinspection JSUnresolvedReference
  const savedAnecdote = await Anecdote(await anecdote.save()).populate("user", {
    username: 1,
    name: 1,
  });
  user.anecdotes.push(savedAnecdote.id);
  await user.save();

  logger.info("anecdote saved!", savedAnecdote);
  response.status(CREATED).json(savedAnecdote);
};

const deleteAnecdote = async (request, response) => {
  const id = request.params.id;

  // noinspection JSCheckFunctionSignatures
  const anecdote = await Anecdote.findById(id);
  if (!anecdote.user.equals(request.user.id)) {
    response
      .status(FORBIDDEN)
      .json({ error: "authenticated user is not owner" })
      .end();
    return;
  }
  await anecdote.deleteOne();
  response.status(NO_CONTENT).end();
};

const updateAnecdote = async (request, response) => {
  const body = request.body;
  const id = request.params.id;

  if (body.user && body.user.name) {
    body.user = body.user.id;
  }

  const savedAnecdote = await Anecdote.findByIdAndUpdate(id, body, {
    runValidators: true,
    strict: true,
    new: true,
  });

  if (!savedAnecdote) {
    response.status(NOT_FOUND).end();
    return;
  }

  const populatedAnecdote = await Anecdote(savedAnecdote).populate("user", {
    username: 1,
    name: 1,
  });
  logger.info("anecdote updated: ", populatedAnecdote);
  response.json(populatedAnecdote).status(OK).end();
};

anecdotesRouter.delete("/:id", mw.userExtractor, deleteAnecdote);
anecdotesRouter.put("/:id", updateAnecdote);
anecdotesRouter.get("/:id", getAnecdote);
anecdotesRouter.get("/", getAllAnecdotes);
anecdotesRouter.post("/", mw.userExtractor, addAnecdote);

module.exports = anecdotesRouter;
