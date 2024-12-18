const reverse = require('../utils/for_testing').reverse
const average = require('../utils/for_testing').average
const listHelper = require('../utils/list_helper')
const totalLikes = require('../utils/list_helper').tota

const blogsToTest = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
describe('reverse tests', () => {
    test('reverse of a', () => {
  const result = reverse('a')

  expect(result).toBe('a')
})

test('reverse of react', () => {
  const result = reverse('react')

  expect(result).toBe('tcaer')
})

test('reverse of releveler', () => {
    const result = reverse('releveler')
  
    expect(result).toBe('releveler')
  })
})

describe('calculation tests', () => {
    test('average', () => {
    expect(average([1])).toBe(1)
})

test('of many is calculated right', () => {
    expect(average([1,2, 3, 4, 5, 6])).toBe(3.5)
})

test('of empty array is zero', () => {
    expect(average([])).toBe(0)
})

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
})


describe('likes tests', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0
        }
      ]
    test('total likes', () => {
        const result = listHelper.totalLikes(blogsToTest)
        expect(result).toBe(36)
    })
    test( 'when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    test('favourite blog', () => {
        const result = listHelper.favouriteBlog(blogsToTest)
        expect(result).toStrictEqual({"likes": 12, "title": "Canonical string reduction"})
    })
    test('most blogs', () => {
        const result = listHelper.mostBlogs(blogsToTest)
        expect(result).toStrictEqual({"author": "Robert C. Martin", "blogs": 3,})
    })
    test('most likes', () => {
        const result = listHelper.mostLikes(blogsToTest)
        expect(result).toStrictEqual({"author": "Edsger W. Dijkstra", "likes": 17,})
    })
})
