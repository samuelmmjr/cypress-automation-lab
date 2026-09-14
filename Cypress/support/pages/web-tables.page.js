class WebTablesPage {
  visit() {
    cy.visit('/webtables');
    cy.removeDemoQaAds();
  }

  addRecord(record) {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(record.firstName);
    cy.get('#lastName').type(record.lastName);
    cy.get('#userEmail').type(record.email);
    cy.get('#age').type(String(record.age));
    cy.get('#salary').type(String(record.salary));
    cy.get('#department').type(record.department);
    cy.get('#submit').click();

    cy.contains('.rt-tr-group', record.email).should('contain.text', record.department);
  }

  editDepartment(email, department) {
    cy.contains('.rt-tr-group', email).within(() => {
      cy.get('[title="Edit"]').click();
    });

    cy.get('#department').should('be.visible').clear().type(department);
    cy.get('#submit').click();

    cy.contains('.rt-tr-group', email).should('contain.text', department);
  }

  deleteRecord(email) {
    cy.contains('.rt-tr-group', email).within(() => {
      cy.get('[title="Delete"]').click();
    });

    cy.contains('.rt-tr-group', email).should('not.exist');
  }
}

export default new WebTablesPage();
