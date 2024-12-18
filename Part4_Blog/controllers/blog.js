const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')




blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1 })
  response.status(200).json(blogs)
})

blogRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.setMaxListeners(200).json(blog)
})

blogRouter.post('/', middleware.tokenExtractor, async (request,response) => {
  const body = request.body
  //for giving access we need to decode passed token without 'Bearer'
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log('Decoded Token:', decodedToken)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById( decodedToken.id )
  if(!user) {
    return response.status(404).json({ error: 'User not found' })
  }
  const newBlog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    user: user._id,
    likes: body.likes || 0 ,
  })
  if (!newBlog.title || !newBlog.url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }
  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})

blogRouter.delete('/:id', middleware.tokenExtractor, async (request, response) => {
  // STEP 1: Extract and verify the token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  // STEP 2: Check if the logged-in user owns the blog
  if (blogToDelete.user.toString() !== decodedToken.id) {
    return response.status(403).json({ error: 'You do not have permission to delete this blog' })
  }

  // STEP 3: Remove the blog from the database
  await blogToDelete.deleteOne()

  // STEP 4: Remove the blog from the user's list
  const user = await User.findById(decodedToken.id)
  user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
  await user.save()

  // Send success response after deletion
  response.status(204).end()
})


blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id , blog, { new: true })
  response.json(updatedNote)
})

module.exports = blogRouter
