
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((mostLikedBlog, currentBlog) => {
    if(currentBlog.likes > mostLikedBlog.likes) {
      return{
        title: currentBlog.title,
        likes: currentBlog.likes
      }
    }
    return {
      title: mostLikedBlog.title,
      likes: mostLikedBlog.likes
    }
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const authorCount = authors.reduce((countMap, author) => {
    countMap[author] = (countMap[author] || 0) + 1
    return countMap
  }, {})

  let mostFrequentAuthor = ''
  let maxBlogs = 0

  for (const author in authorCount){
    if(authorCount[author] > maxBlogs) {
      mostFrequentAuthor = author
      maxBlogs = authorCount[author]
    }
  }
  return { author:mostFrequentAuthor, blogs: maxBlogs }
}

const mostLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const authors = blogs.map(blog => blog.author)

  const authorLikes = authors.reduce((countMap, author,index) => {
    if(!countMap[author]){
      countMap[author] = 0
    }
    countMap[author] += likes[index]
    return countMap
  }, {})
  let maxLikes = 0
  let authorWithMostLikes = ''

  for(let author in authorLikes) {
    if(authorLikes[author] > maxLikes){
      maxLikes = authorLikes[author]
      authorWithMostLikes = author
    }
  }
  return { author: authorWithMostLikes, likes: maxLikes }
}

const dummy = (blogs) => {
  if(blogs.length === 0){
    return 1
  }
  return blogs.length
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}