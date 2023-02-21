describe("Login Page", () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    //cy.exec("npm run db:reset && npm run db:seed")

    // seed a user in the DB that we can control from our tests
    // assuming it generates a random password for us
    // cy.request("POST", "/test/seed/user", { username: "jane.lane" })
    //   .its("body")
    //   .as("currentUser")
  })
  let currentUser = {
    "username": "bedan",
    "password": "bedan123"
  }

  it("Při úspěšném přihlášení vytvoří autorizační token", function () {
    // destructuring assignment of the this.currentUser object
    const { username, password } = currentUser

    cy.visit("login")
      .should(() => {
        expect(localStorage.getItem("authorization")).to.be.null
      })

    cy.get("input[id=username]").type(username)
    cy.get("input[id=password]").type(`${password}{enter}`)

    cy.get(".dx-loadpanel").should("not.have.class", "dx-state-invisible")

    cy.url({timeout: 30000})
      .should("include", "dashboard")
      .should(() => {
        expect(localStorage.getItem("authorization")).to.contains("Bearer")
      })

    cy.get("#header").within(() => {
      //todo pomocí data-cy to daný prvek nenajde
      //cy.get('[data-cy="user"]').should("contains", "Bedaň")
    })
  })

  it("Při neúspěšném přihlášení vyskočí chybová hláška", function () {
    const { username, password } = {
      "username": "asdf",
      "password": "qwer"
    }

    cy.visit("login")

    cy.get("input[id=username]").type(username)
    cy.get("input[id=password]").type(`${password}{enter}`)

    cy.get(".dx-loadpanel").should("not.have.class", "dx-state-invisible")

    cy.url({timeout: 30000})
      .should("include", "/login")
      .should(() => {
        expect(localStorage.getItem("authorization")).to.be.null
      })

    cy.get(".dx-popup").should("not.have.class", "dx-state-invisible")
  })
})