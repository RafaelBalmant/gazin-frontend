export default class Developer {
  createDeveloper(developer) {
    cy.contains('DESENVOLVEDORES').click()
    cy.get("[data-test='button-open-modal-create']").click()
    cy.get("[data-test='input-name-developer']").type(developer.name)
    cy.get("[data-test='input-age-developer']").type(developer.age)
    cy.get("[data-test='input-hobby-developer']").type(developer.hobby)
    cy.get("[data-test='select-level-developer']").select(developer.level)
    cy.get("[data-test='select-gender-developer']").select(developer.gender)
    cy.get("[data-test='input-date-developer']").type(developer.birthdate)
    cy.get("[data-test='button-submit-developer']").click()
    cy.contains('O usuario criado com sucesso')
    cy.contains(developer.name)
  }

  deleteDeveloper(developer) {
    cy.contains('DESENVOLVEDORES').click()
    const idDeleteButton = `button-delete-developer-${developer.name}`
    cy.get(`[data-test=${idDeleteButton}]`).click()
    cy.contains('Sim').click()
    cy.contains('Usuario deletado com sucesso')
  }

  updateDeveloper(developer, oldName) {
    cy.contains('DESENVOLVEDORES').click()
    const idEditButton = `button-edit-developer-${oldName}`
    cy.get(`[data-test=${idEditButton}]`).click()
    cy.get("[data-test='input-name-developer']").clear().type(developer.name)
    cy.get("[data-test='input-age-developer']").clear().type(developer.age)
    cy.get("[data-test='input-hobby-developer']").clear().type(developer.hobby)
    cy.get("[data-test='select-level-developer']").select(developer.level)
    cy.get("[data-test='select-gender-developer']").select(developer.gender)
    cy.get("[data-test='input-date-developer']")
      .clear()
      .type(developer.birthdate)
    cy.get("[data-test='button-submit-developer']").click()
    cy.contains('O usuario atualizado com sucesso')
    cy.contains(developer.name)
  }
}
