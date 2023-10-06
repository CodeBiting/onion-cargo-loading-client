/**
 * To test:
 * 
 * 1. open a terminal and run the app to test:
 * $ npm start
 * 
 * 2. open a terminal and open the cypress app:
 * $ npx cypress open
 * 
 * 3. in the cypress app open the test to verify 
 * 
 * 4. create or modify a cypress test and cypress executes all the tests automatically
 */

describe('Cargo loading service UI', () => {
    beforeEach(() => {
      cy.visit('/containers')
    });
  
    it('must exists a header and footer', () => {
      cy.getByData('service-heading').should("exist")
      cy.getByData('pagination-form').should("exist")
  
      cy.getByData('add-button').should("exist")
      cy.getByData('modify-button').should("exist")
      cy.getByData('delete-button').should("exist")
  
      cy.getByData('add-form').should("exist")
      cy.getByData('modify-form').should("exist")
      cy.getByData('delete-form').should("exist")
    });
  })