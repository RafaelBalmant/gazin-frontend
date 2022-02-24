export default class Level {
  createLevel(name) {
    cy.get("[data-test='button-level-page']").click()
    cy.get("[data-test='button-open-modal-create']").click()
    cy.get("[data-test='input-level-name']").type(name)
    cy.get("[data-test='button-submit-level']").click()
    cy.contains('O nivel criado com sucesso')
  }

  deleteLevel(name) {
    cy.get("[data-test='button-level-page']").click()
    const idDeleteButton = `button-delete-level-${name}`
    cy.get(`[data-test=${idDeleteButton}]`).click()
    cy.wait(2000)
    cy.contains('Você deseja deletar esse nivel?')
    cy.contains('Sim').click()
    cy.contains('Nivel deletado com sucesso!')
  }

  updateLevel(name) {
    cy.get("[data-test='button-level-page']").click()
    const idEditButton = `button-edit-level-${name}`
    cy.get(`[data-test=${idEditButton}]`).click()
    cy.get("[data-test='input-level-name']")
      .clear()
      .type(name + 'edit')
    cy.get("[data-test='button-submit-level']").click()
    cy.contains('O nivel foi atualizado com sucesso')
    cy.contains(name + 'edit')
  }
}
