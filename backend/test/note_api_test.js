// noinspection JSCheckFunctionSignatures,JSUnresolvedReference

const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./notes_test_helper')
const userHelper = require('./user_test_helper')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
    beforeEach(async () => {
        await userHelper.initDatabase()
        await helper.initDatabase()
    })

    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')
        assert.strictEqual(response.body.length, helper.initialNotes.length)
    })

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')
        const contents = response.body.map(e => e.content)
        assert(contents.includes('HTML is easy'))
    })

    describe('viewing a specific note', () => {
        test('a specific note can be viewed', async () => {
            const notesAtStart = await helper.notesInDb()
            const noteToView = notesAtStart[0]

            const resultNote = await api
                .get(`/api/notes/${noteToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.deepStrictEqual(resultNote.body, noteToView)
        })

        test('fails with statuscode 404 if note does not exist', async () => {
            const validNonexistingId = await helper.nonExistingId()

            await api.get(`/api/notes/${validNonexistingId}`).expect(404)
        })

        test('fails with statuscode 400 id is invalid', async () => {
            const invalidId = '5a3d5da59070081a82a3445'

            await api.get(`/api/notes/${invalidId}`).expect(400)
        })
    })

    describe('addition of a new note', () => {
        test('succeeds with valid data', async () => {
            const userToken = await userHelper.authenticatedUserToken(userHelper.initialUsers[1], api)

            const newNote = {
                content: 'async/await simplifies making async calls',
                important: true,
            }

            await api
                .post('/api/notes')
                .set('Authorization', `Bearer ${userToken}`)
                .send(newNote)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const notesAtEnd = await helper.notesInDb()
            assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

            const contents = notesAtEnd.map(n => n.content)
            assert(contents.includes('async/await simplifies making async calls'))

        })

        test('fails with status code 400 if data is invalid', async () => {
            const newNote = {
                important: true
            }

            await api
                .post('/api/notes')
                .send(newNote)
                .expect(400)

            const notesAtEnd = await helper.notesInDb()
            assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
        })
        test('after adding a new note it is listed in the notes list of a user', async () => {
            const loginUser = userHelper.initialUsers[1]
            const userToken = await userHelper.authenticatedUserToken(loginUser, api)
            const newNote = {
                content: 'population is quite tricky',
                important: true,
            }
            await api
                .post('/api/notes')
                .set('Authorization', `Bearer ${userToken}`)
                .send(newNote)
                .expect(201)
            const notesAtEnd = await helper.notesInDb()
            const storedNote = notesAtEnd.filter(note => note.content.startsWith('population'))[0]
            const noteDbUserId = storedNote.user.id
            const noteDbUser = await userHelper.getUserFromDb(noteDbUserId)
            assert.strictEqual(noteDbUser.username, loginUser.username)
            const notes = noteDbUser.notes
            assert(notes.length > 0)
            const matchingNotesInUser = noteDbUser.notes.filter(note => note.id === storedNote.id)
            assert(matchingNotesInUser.length === 1)
        })
    })

    describe('deletion of a note', () => {
        test('succeeds with status code 204 if the id is valid', async () => {
            const notesAtStart = await helper.notesInDb()
            const noteToDelete = notesAtStart[0]

            await api
                .delete(`/api/notes/${noteToDelete.id}`)
                .expect(204)

            const notesAtEnd = await helper.notesInDb()

            const contents = notesAtEnd.map(n => n.content)
            assert(!contents.includes(noteToDelete.content))

            assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })

})