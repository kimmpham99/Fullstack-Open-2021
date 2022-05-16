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
  })
})