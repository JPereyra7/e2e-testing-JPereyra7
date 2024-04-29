describe('it should test createHtml', () => {
  it('it is testing the input field', () => {
    cy.visit('http://localhost:5173/')
    cy.get("input").type("Star Wars").should("have.value","Star Wars")
  })
  it("it should test the api call", () => {
    cy.visit('http://localhost:5173/')
    cy.get("input").type("Star Wars").should("have.value","Star Wars")
    cy.get("button").click();
    cy.get("h3:first").should("have.text", "Star Wars: Episode IV - A New Hope")
  })
  it("it should check that there are 10 objects returned", () => {
    cy.visit('http://localhost:5173/')
    cy.get("input").type("Star Wars").should("have.value","Star Wars")
    cy.get("button").click();
    cy.get(".movie").should("have.length", 10)
  })
  it("it should check for no result", () => {
    cy.visit('http://localhost:5173/')
    cy.get("input").type("{enter}")
    cy.get("p").should("have.text", "Inga sökresultat att visa")
  })
})