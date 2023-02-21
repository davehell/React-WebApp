describe("The home page", () => {
  context("Online režim", function () {
    before(function () {
      cy.loginOnService("bedan", "bedan123")
    })
  
    it("opens page as logged in user", () => {
      cy.visit("/dashboard")
      cy.get('[data-cy=MainNavigationItem-user]').contains("Bedaň")
    })
  
    it("opens another page as the same logged in user", () => {
      cy.visit("/people/organization")
      cy.contains("Struktura oddělení")
    })
  
    it("login page is displayed after logout", () => {
      cy.visit("/dashboard")
      cy.get(".content").should('be.visible')
      cy.logout()
      cy.url()
        .should("include", "/login")
        .should(() => {
          expect(localStorage.getItem("authorization")).to.be.null
        })
    })
  })

  context.only("Offline režim", function () {
    before(function () {
      cy.login("hellebrand")
    })

    it("Horní navigace - funguje odkaz Domů", () => {
      cy.get('[data-cy=MainNavigationItem-home]').click()
      cy.get('[data-cy=SectionTitle]').contains("Odkazy")
      cy.get('[data-cy=SectionTitle]').contains("Aktuality")
    })

    it("Horní navigace - funguje odkaz Lidé", () => {
      cy.get('[data-cy=MainNavigationItem-users]').click()
      cy.get('[data-cy=SectionTitle]').contains("Seznam zaměstnanců")
    })

    it("Horní navigace - funguje odkaz EDOS, když uživatel nemá žádné Předvolby", () => {
      cy.intercept("odata/EmployeeToProjectItemLinks*", [])
      cy.get('[data-cy=MainNavigationItem-clock]').click()
      cy.get('[data-cy=SectionTitle]').contains("Docházka")
    })

    it("Horní navigace - funguje odkaz EDOS, když uživatel má nastaveny Předvolby", () => {
      cy.intercept("odata/EmployeeToProjectItemLinks*", [{ "EmployeeRefId": 1, "Id": 1 }])
      cy.get('[data-cy=MainNavigationItem-clock]').click()
      cy.get('[data-cy=SectionTitle]').contains("Aktuální úkol")
    })

    it("Horní navigace - funguje odkaz Detail uživatele", () => {
      cy.intercept("odata/Persons*", {})
      cy.get("[data-cy=MainNavigationItem-user]").click()
      cy.get('[data-cy=SectionTitle]').contains("Informace o zaměstnanci")
    })

    it("Horní navigace - funguje odkaz Odhlásit", () => {
      cy.get("[data-cy=MainNavigationItem-sign-out]").click()
      cy.get('[data-cy=SectionTitle]').contains("Odkazy")
      cy.url().should("include", "/login")
    })
  })
})