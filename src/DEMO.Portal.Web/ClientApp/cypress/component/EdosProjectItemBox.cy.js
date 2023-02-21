import EdosProjectItemsBox from '../../src/components/edos/EdosProjectItemsBox'
const logins = require('../fixtures/logins.json')

describe("EdosProjectItemsBox", () => {
  const username = "hellebrand";
  const projectCategories = [{Code: "A"}, {Code: "B"}];
  const projects = [{Id: "1", FullName: "A001"}, {Id: "2", FullName: "A002"}];
  const projectItems = [{"WorkType":logins[username].person.Employee.DefaultWorkType}, {"WorkType":{"Name":"DĚLNÍK"}}];

  let initTagBox = function(projectCategories, activeCategories) {
    if(!activeCategories) {
      activeCategories = projectCategories;
    }
    cy.intercept("ProjectCategories*ProjectCategoryToOrganizationUnitLinks*", projectCategories).as("LoadProjectCategoriesForCompany")
    cy.intercept("ProjectCategories*ActiveForEmployees*", activeCategories).as("LoadUserActiveProjectCategories")
    cy.intercept("Projects*", projects).as("Projects")
    const onActiveProjectCategoriesChangedSpy = cy.spy().as('OnActiveProjectCategoriesChanged')
    const onProjectItemsChanged = cy.spy().as('OnProjectItemsChanged')

    cy.mount(
      <EdosProjectItemsBox
        employeeId={259}
        onActiveProjectCategoriesChanged={onActiveProjectCategoriesChangedSpy}
        onProjectItemsChanged={onProjectItemsChanged}
      />
    )
  }

  beforeEach(function () {
    cy.interceptLogin(username)
  })

  describe("ProjectCategory TagBox", () => {
    it('Uživatel bez ActiveProjectCategories má prázdný TagBox', () => {
      let activeCategories = [];
      initTagBox(projectCategories, activeCategories);
  
      cy.get('[name="Category"] .dx-tag').should('not.exist');
    })

    it('Uživatel s ActiveProjectCategories má předvyplněný TagBox', () => {
      let activeCategories = [projectCategories[0]];
      initTagBox(projectCategories, activeCategories);
  
      cy.get('[name="Category"] .dx-tag').should("have.length", activeCategories.length);
    })
  })

  describe("Project SelectBox", () => {
    it('V SelectBoxu je předvolena hodnota, protože kritériím vyhovuje jen jedna', () => {
      initTagBox(projectCategories);
      cy.intercept("Projects*", projects[0]).as("Projects") //v odpovědi je jen 1 záznam
      cy.intercept("ProjectItems*", []).as("ProjectItems") //jen aby dotaz nevracel 404 NotFound
  
      cy.wait('@Projects').then(() => {
        cy.get('[name="Project"] .dx-lookup-field').should('have.text',  projects[0].FullName);
      });
    })

    it('V SelectBoxu není předvolena hodnota, protože kritériím jich vyhovuje více', () => {
      initTagBox(projectCategories);
      cy.intercept("Projects*", projects).as("Projects") //v odpovědi je více záznamů
  
      cy.wait('@Projects').then(() => {
        cy.get('[name="Project"] .dx-lookup-field').should('not.have.text',  projects[0].FullName);
      });
    })

    //TODO udělat ruční výběr hodnoty v SelectBoxu
    it.skip('TODO Při změně hodnoty SelectBoxu se informace předá do rodičovské komponenty ', () => {
      //1. Vybrat hodnotu Projects
      //2. Vybrat hodnotu WorkType
      //3. zavolá se OnProjectItemsChanged
      //4. změnit hodnotu Projects
      //5. zavolá se OnProjectItemsChanged
    })
  })

  describe("WorkType SelectBox", () => {
    it('V SelectBoxu je předvolena hodnota, protože přihlášený uživatel ji má nastavenu jako DefaultWorkType', () => {
      initTagBox(projectCategories);
      //je potřeba vybrat nějaký záznam, aby se spustilo naplnění pole ProjectItems
      //pokud bude v odpovědi jen jediný záznam, předvyplní se sám
      cy.intercept("Projects*", projects[0]).as("Projects") //v odpovědi je jen 1 záznam
      cy.intercept("ProjectItems*", projectItems[0]).as("ProjectItems") //projektant
  
      cy.wait(['@Projects', '@ProjectItems']).then(() => {
        cy.get('[name="WorkType"] .dx-lookup-field').should('have.text', projectItems[0].WorkType.Name);
        //TODO po dodělání testu "Při změně hodnoty SelectBoxu..." se může smazat
        cy.get('@OnProjectItemsChanged').should('have.been.called')
      });
    })

    it('V SelectBoxu není předvolena hodnota, protože kritériím jich vyhovuje více', () => {
      initTagBox(projectCategories);
      //je potřeba vybrat nějaký záznam, aby se spustilo naplnění pole ProjectItems
      //pokud bude v odpovědi jen jediný záznam, předvyplní se sám
      cy.intercept("Projects*", projects[0]).as("Projects") //v odpovědi je jen 1 záznam
      cy.intercept("ProjectItems*", projectItems[1]).as("ProjectItems") //dělník
  
      cy.wait('@ProjectItems').then(() => {
        cy.get('[name="WorkType"] .dx-lookup-field').should('not.have.text',  projectItems[1].WorkType.Name);
      });
    })

    //TODO udělat ruční výběr hodnoty v SelectBoxu
    it.skip('TODO Při změně hodnoty SelectBoxu se informace předá do rodičovské komponenty ', () => {
      //1. Vybrat hodnotu Projects
      //2. Vybrat hodnotu WorkType
      //3. zavolá se OnProjectItemsChanged
      //4. změnit hodnotu WorkType
      //5. zavolá se OnProjectItemsChanged
    })
  })
})