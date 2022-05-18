describe('Blog app', function () {

  //5.17 - Empty the server's database before tests are run + check login form
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    //create here a user to backend
    const user = {
      name: 'Kim Pham Test',
      username: 'kimpatest',
      password: 'kim31051999'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  //5.18 - Test both successful and unsuccessful login attempts
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('kimpatest')
      cy.get('#password').type('kim31051999')
      cy.get('#login-button').click()

      cy.contains('Kim Pham Test logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('kimpatest')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  //5.19 - checking that a logged-in user can create a new blog
  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('kimpatest')
      cy.get('#password').type('kim31051999')
      cy.get('#login-button').click()

      cy.contains('Kim Pham Test logged in')
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()

      const sampleBlog = {
        likes: 0,
        title: "Test title",
        author: "kimpa",
        url: "http://www.webTest.com",
      }

      cy.get('#title-input').type(sampleBlog.title)
      cy.get('#author-input').type(sampleBlog.author)
      cy.get('#url-input').type(sampleBlog.url)
      cy.get('#create-button').click()

      cy.get('.blogDetail').contains(sampleBlog.title)

      //5.20 - checking that users can like a blog
      cy.get('.blogDetail').contains('view').click()
      cy.get('.blogDetail').contains('like').click()
      cy.get('.blog-like').should('contain', (sampleBlog.likes + 1).toString())

      //5.21 - checking that users can remove a blog
      cy.get('.blogDetail').contains('remove').click()
      cy.contains('blogs').parent().not(sampleBlog.title, 'contain')
    })

    //5.20 - checking that users can like a blog
    it('A blog can be liked', function () {
      cy.contains('create new blog').click()

      const sampleBlog = {
        likes: 0,
        title: "Test title",
        author: "kimpa",
        url: "http://www.webTest.com",
      }

      cy.get('#title-input').type(sampleBlog.title)
      cy.get('#author-input').type(sampleBlog.author)
      cy.get('#url-input').type(sampleBlog.url)
      cy.get('#create-button').click()

      cy.get('.blogDetail').contains('view').click()
      cy.get('.blogDetail').contains('like').click()
      cy.get('.blog-like').should('contain', (sampleBlog.likes + 1).toString())
    })

    //5.21 - checking that users can remove a blog
    it('A blog can be removed', function () {
      cy.contains('create new blog').click()

      const sampleBlog = {
        likes: 0,
        title: "Test title",
        author: "kimpa",
        url: "http://www.webTest.com",
      }

      cy.get('#title-input').type(sampleBlog.title)
      cy.get('#author-input').type(sampleBlog.author)
      cy.get('#url-input').type(sampleBlog.url)
      cy.get('#create-button').click()

      cy.get('.blogDetail').contains('view').click()
      cy.get('.blogDetail').contains('remove').click()
      cy.contains('blogs').parent().not(sampleBlog.title, 'contain')
    })
  })

  //5.22 - checking that the blogs are ordered according to likes
  describe('blogs are ordered according to likes', function () {

    it('Blogs are ordered by likes', function () {

      const userLogin = {
        username: 'kimpatest',
        password: 'kim31051999'
      }

      cy.login(userLogin)

      const sampleBlogs = [
        {
          title: "Test title 1",
          author: "kimpa_1",
          url: "http://www.webTest1.com",
          likes: 20
        },
        {
          title: "Test title 2",
          author: "kimpa_2",
          url: "http://www.webTest2.com",
          likes: 7
        },
        {
          title: "Test title 3",
          author: "kimpa_3",
          url: "http://www.webTest3.com",
          likes: 100
        }
      ]

      //add new blogs and click like button
      cy.createBlog(sampleBlogs[0])
      cy.createBlog(sampleBlogs[1])
      cy.createBlog(sampleBlogs[2])
            
      cy.get('#username').type('kimpatest')
      cy.get('#password').type('kim31051999')
      cy.get('#login-button').click()

      //check order
      cy.get('.blogDetail').eq(0).contains('view').click()
      cy.get('.blogDetail').eq(0).should('contain', '100')
      cy.get('.blogDetail').eq(1).contains('view').click()
      cy.get('.blogDetail').eq(1).should('contain', '20')
      cy.get('.blogDetail').eq(2).contains('view').click()
      cy.get('.blogDetail').eq(2).should('contain', '7')
    })
  })
})