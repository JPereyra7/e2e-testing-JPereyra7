describe('Testing the mocked Data', () => {
  it('it should test the mocked data and the results', () => {
    cy.visit('http://localhost:5173')
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {
 
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
    cy.get("input").type("hobbit")
    cy.get("button").click()
    cy.get("h3").should("have.text", "El Don Hobbít ✨")
    cy.get(".movie").should("have.length", 1)

    cy.get("#movie-container > .movie > img:first").then(($image) => {
      const src = $image.prop("src")
      expect(src).to.equal("https://images.cdn1.buscalibre.com/fit-in/360x360/f3/64/f364c82c3048f25d6cdbea2e1c652b9c.jpg")
    })
    
  })
  it("it should test the no results", () => {
    cy.visit('http://localhost:5173')
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {
 
      statusCode: 200, //why 200? för även om sökresultatet misslyckas så lyckas anropet 
      "Search": [
        {
          "Response": "False",
          "Error": "Movie not found"
        }
      ]
    })
    cy.get("input").type("hobbit")
    cy.get("button").click()
    cy.get(".movie").should("have.length", 0)
    cy.get("p").should("have.text", "Inga sökresultat att visa")
  })
})