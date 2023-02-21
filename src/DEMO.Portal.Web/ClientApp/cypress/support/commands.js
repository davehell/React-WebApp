// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: "element"}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: "optional"}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const logins = require('../fixtures/logins.json')

Cypress.Commands.add("login", (username) => {
  const login = logins[username];
  cy.intercept("security/LogonSSO", login.sso).as("LogonSSO")
  cy.intercept("security/GetCurrentUser", login.currentUser).as("GetCurrentUser")
  cy.intercept("odata/Persons*", login.person).as("LoadUserInfo")
  cy.intercept("odata/PersonToResponsibilityLinks*", login.responsibilities).as("LoadUserInfo_Responsibilities")
  cy.intercept("odata/OrganizationUnits*", login.headOfOrgUnits).as("LoadUserInfo_OrganizationUnits")

  cy.visit("/")

  cy.wait("@LogonSSO")
  cy.wait("@GetCurrentUser")
  cy.wait("@LoadUserInfo")
  cy.wait("@LoadUserInfo_Responsibilities")
  cy.wait("@LoadUserInfo_OrganizationUnits")
})

Cypress.Commands.add("interceptLogin", (username) => {
  localStorage.setItem("authorization", "asdf")
  const login = logins[username];
  cy.intercept("security/GetCurrentUser", login.currentUser).as("getUsernameForCurrentUser")
  cy.intercept("Persons*", login.person).as("LoadUserInfo")
  cy.intercept("PersonToResponsibilityLinks*", login.responsibilities).as("LoadUserInfo_Responsibilities")
  cy.intercept("OrganizationUnits?%24select=Guid%2CName*", login.headOfOrgUnits).as("LoadUserInfo_OrganizationUnits")
})


Cypress.Commands.add("fakeToken", (username) => {
  const token = logins[username].sso.token;
  const auth =  "Bearer " + token;

  Cypress.on('window:before:load', (win) => {
    win.localStorage.setItem("authorization", auth);
  })
})

Cypress.Commands.add("loginOnService", (username, password) => {
  cy.request({
    method: "POST",
    url: Cypress.config("webApiUrl") + "security/Logon",
    body: {
      username: username,
      password: password
    }
  })
  .then((response) => {
    const auth =  "Bearer " + response.body.token
    Cypress.on('window:before:load', (win) => {
        win.localStorage.setItem("authorization", auth);
    })
  })
})

Cypress.Commands.add("logout", () => {
  cy.visit("/logout")
  // cy.visit("/dashboard")
  // cy.get("#MainNavigationItem-sign-out").click()
})