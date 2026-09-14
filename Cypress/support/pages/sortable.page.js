class SortablePage {
  visit() {
    cy.visit("/sortable");
    cy.removeDemoQaAds();
  }

  validateDefaultListOrder() {
    const expectedOrder = ["One", "Two", "Three", "Four", "Five", "Six"];

    cy.get("#demo-tab-list").should("have.class", "active");

    cy.get("#demo-tabpane-list .vertical-list-container .list-group-item")
      .should("have.length", expectedOrder.length)
      .then(($items) => {
        const currentOrder = [...$items].map((item) => item.innerText.trim());
        expect(currentOrder).to.deep.equal(expectedOrder);
      });
  }
}

export default new SortablePage();
