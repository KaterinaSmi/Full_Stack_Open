const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Note = require('../models/notes');

const api = supertest(app);

describe('when there are initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({});
    console.log('cleared');
    await Note.insertMany(helper.initialNotes);
  });

  test('notes are returned as JSON', async () => {
    console.log('entered test');
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');
    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map(note => note.content);
    expect(contents).toContain('HTML is easy');
  });
});

describe('viewing a specific note', () => {
  test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultNote.body).toEqual(noteToView);
  });

  test('fails with status code 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();
    await api.get(`/api/notes/${validNonexistingId}`).expect(404);
  });

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api.get(`/api/notes/${invalidId}`).expect(400);
  });
});

describe('addition of a new note', () => {
  test.only('a valid note can be added', async () => {
    const notesAtStart = await helper.notesInDb();
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(notesAtStart.length + 1);

    const contents = notesAtEnd.map(note => note.content);
    expect(contents).toContain('async/await simplifies making async calls');
  });

  test.only('fails with code 400 if data is invalid', async () => {
    const notesAtStart = await helper.notesInDb();
    const newNote = {
      important: true,
    };

    await api.post('/api/notes').send(newNote).expect(400);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(notesAtStart.length);
  });
});

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDb();

    const contents = notesAtEnd.map(note => note.content);
    expect(contents).not.toContain(noteToDelete.content);
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
