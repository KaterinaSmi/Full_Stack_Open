const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./helper');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

describe('when there is initially some notes', () => {
  let token;
  let user;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    // Create a user and log them in
    const result = await helper.createUserAndLogin();
    user = result.user;
    token = result.token;

    const blogWithUser = helper.initialBlogs.map(blog => ({
      ...blog,
      user: user._id,
    }));
    await Blog.insertMany(blogWithUser);
  });

  test('get all the notes as JSON', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('verify the length', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe('viewing a specific blog and data validity', () => {
  let token;
  let user;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    // Create a user and log them in
    const result = await helper.createUserAndLogin();
    user = result.user;
    token = result.token;

    const blogWithUser = helper.initialBlogs.map(blog => ({
      ...blog,
      user: user._id,
    }));
    await Blog.insertMany(blogWithUser);
  });

  test('return id instead of _id', async () => {
    const blogToUse = {
      title: 'New Blog Title',
      author: 'Test1 Author',
      url: 'http://newblog.com',
      likes: 10,
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogToUse)
      .expect(201);

    const blog = response.body;

    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined();
  });

  test('post method success check', async () => {
    const blogsAtStart = await helper.allBlogs();

    const newBlog = {
      title: 'Test Blog to Check Method Success',
      author: 'Tester1',
      url: 'http://testblog.com',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.allBlogs();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).toContain(newBlog.title);
  });

  test('check whether likes default to 0 if missing', async () => {
    const newBlog = {
      title: 'Test Blog to Check',
      author: 'Me',
      url: 'http://testblog.com',
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const createdBlog = response.body;

    expect(createdBlog.likes).toBe(0);
  });

  test('checking whether title or url is missing', async () => {
    const newBlog = {
      author: 'Me',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const notesAtEnd = await helper.allBlogs();
    expect(notesAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deleting the blog post with an id', () => {
  let token;
  let user;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    // Create a user and log them in
    const result = await helper.createUserAndLogin();
    user = result.user;
    token = result.token;

    const blogWithUser = helper.initialBlogs.map(blog => ({
      ...blog,
      user: user._id,
    }));
    await Blog.insertMany(blogWithUser);
  });

  test('deleting a certain blog', async () => {
    const blogsAtStart = await helper.allBlogs();
    const blogToDelete = blogsAtStart[1];
    console.log('Blog to delete ID:', blogToDelete.id);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.allBlogs();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
