class WebTablesPage {
  visit() {
    cy.visit("/webtables");

    cy.get("#addNewRecordButton").should("be.visible");

    cy.removeDemoQaAds();
  }

  getRowByEmail(email) {
    return cy.contains("table tbody tr", email);
  }

  addRecord(record) {
    cy.get("#addNewRecordButton").should("be.visible").click();

    cy.get(".modal-content").should("be.visible");

    cy.get("#firstName").type(record.firstName);
    cy.get("#lastName").type(record.lastName);
    cy.get("#userEmail").type(record.email);
    cy.get("#age").type(String(record.age));
    cy.get("#salary").type(String(record.salary));
    cy.get("#department").type(record.department);

    cy.get("#submit").should("be.enabled").click();

    cy.get(".modal-content").should("not.exist");

    this.getRowByEmail(record.email)
      .should("be.visible")
      .and("contain.text", record.department);
  }

  editDepartment(email, department) {
    cy.removeDemoQaAds();

    this.getRowByEmail(email)
      .scrollIntoView()
      .within(() => {
        cy.get('[title="Edit"]').should("exist").click({ force: true });
      });

    cy.get(".modal-content").should("be.visible");

    cy.get("#department").clear().type(department);

    cy.get("#submit").should("be.enabled").click();

    cy.get(".modal-content").should("not.exist");

    this.getRowByEmail(email)
      .should("be.visible")
      .and("contain.text", department);
  }

  deleteRecord(email) {
    cy.removeDemoQaAds();

    this.getRowByEmail(email)
      .scrollIntoView()
      .within(() => {
        cy.get('[title="Delete"]').should("exist").click({ force: true });
      });

    cy.contains("table tbody tr", email).should("not.exist");
  }
}

export default new WebTablesPage();
