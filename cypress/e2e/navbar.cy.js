// navbar.cy.js
describe('Navbar Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should render the Navbar', () => {
    cy.contains('Navbar').should('be.visible');
  });
});
