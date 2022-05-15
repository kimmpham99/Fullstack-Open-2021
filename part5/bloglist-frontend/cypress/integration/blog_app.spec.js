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
})