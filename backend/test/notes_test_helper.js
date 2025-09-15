const Note = require("../models/note");
const userHelper = require("./user_test_helper");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: "willRemoveThisSoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDb = async () => {
  // noinspection JSCheckFunctionSignatures
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  // noinspection JSUnresolvedReference
  return notes.map((note) => note.toJSON());
};

const populateDatabaseWithInitialNotes = async () => {
  const users = await userHelper.usersInDb();
  const user = users[0];
  const promises = [];
  initialNotes.forEach((note) => {
    note.user = user.id;
    promises.push(Note.create(note));
  });
  await Promise.all(promises);
  const dbUser = await userHelper.getUserFromDb(user.id);
  const storedNotes = await notesInDb();
  dbUser.notes = storedNotes.map((note) => note.id);
  return await dbUser.save();
};

const initDatabase = async () => {
  await Note.deleteMany({});
  // noinspection JSUnresolvedReference
  await populateDatabaseWithInitialNotes();
};

module.exports = {
  initialNotes,
  initDatabase,
  nonExistingId,
  notesInDb,
};
