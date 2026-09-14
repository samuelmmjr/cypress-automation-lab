class SortablePage {
  visit() {
    cy.visit('/sortable');
    cy.removeDemoQaAds();
  }

  validateDefaultListOrder() {
    const expectedOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

    cy.get('#demo-tab-list').should('have.class', 'active');
    cy.get('.vertical-list-container > div:visible').should(($items) => {
      const currentOrder = [...$items].map((item) => item.innerText.trim());
      expect(currentOrder).to.deep.equal(expectedOrder);
    });
  }
}

export default new SortablePage();
