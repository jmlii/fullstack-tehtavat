describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tina Test',
      username: 'tinatest',
      password: 'secret'
    }
    const user2 = {
      name: 'Tessa Test',
      username: 'tessatest',
      password: 'sercet'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is visible when landing on app', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('tinatest')
      cy.get('#password-input').type('secret')
      cy.get('#login-button').click()
      cy.contains('Tina Test logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('tinatest')
      cy.get('#password-input').type('secr')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
      cy.get('html').should('not.contain', 'Tina Test logged in')
    })
  })

  // Code for login and createBlog commands in file cypress/support/commands.js
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'tinatest', password:'secret' })
    })
    it('a blog can be created and it is shown in the blog list', function() {
      cy.contains('Add new blog').click()
      cy.get('#title-input').type('Testing is fun')
      cy.get('#author-input').type('Super Tester')
      cy.get('#url-input').type('http://testingisfun.net')
      cy.get('#add-button').click()
      cy.contains('Testing is fun - Super Tester')
    })
    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Test blog 1', author: 'Blog Author 1', url: 'http://test1.url' })
        cy.createBlog({ title: 'Test blog 2', author: 'Blog Author 2', url: 'http://test2.url' })
        cy.createBlog({ title: 'Test blog 3', author: 'Blog Author 3', url: 'http://test3.url' })
      })
      it('a blog can be liked', function() {
        cy.contains('Test blog 2')
          .contains('View')
          .click()
        cy.contains('Likes')
          .contains('Like')
          .click()
        cy.contains('Likes 1')
      })
      it('a blog can be removed by the user who added the blog', function() {
        cy.contains('Test blog 1')
          .contains('View')
          .click()
        cy.get('#remove-button').click()
        cy.get('html')
          .should('contain', 'Test blog 2 - Blog Author 2')
          .and('not.contain', 'Test blog 1 - Blog Author 1')
      })
      it('the remove button for a blog is not visible if the blog was not added by current user', function() {
        cy.login({ username:'tessatest', password:'sercet' })
        cy.contains('Test blog 2')
          .contains('View')
          .click()
        cy.get('html')
          .should('not.contain', 'Remove')
      })
      it.only('blogs are ordered by likes in descending order', function() {
        cy.get('.blog').eq(0).should('contain', 'Test blog 1')
        cy.get('.blog').eq(1).should('contain', 'Test blog 2')
        cy.contains('Test blog 2')
          .contains('View')
          .click()
        cy.contains('Like')
          .click()
        cy.contains('Likes 1')
        cy.contains('Test blog 1')
          .contains('View')
          .click()
        cy.get('.blog').eq(0).should('contain', 'Test blog 2')
        cy.get('.blog').eq(1).should('contain', 'Test blog 1')

      })
    })
  })

})