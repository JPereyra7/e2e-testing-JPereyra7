describe('Testing mocked Data', () => {
  it('Testing search', () => {
    cy.visit('http://localhost:5173')
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=hobbit", {
 
      "Search": [
        {
          "Title": "El Don Hobbít ✨",
          "Year": "2025",
          "imdbID": "tt14404368",
          "Type": "movie",
          "Poster": "https://images.cdn1.buscalibre.com/fit-in/360x360/f3/64/f364c82c3048f25d6cdbea2e1c652b9c.jpg"
        }
      ]
    })
    cy.get("input").type("hobbit{enter}")
    cy.get("h3").should("have.text", "El Don Hobbít ✨")
    cy.get(".movie").should("have.length", 1)
  })
})