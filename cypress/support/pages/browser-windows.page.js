class BrowserWindowsPage {
  visit() {
    cy.visit("/browser-windows");
    cy.removeDemoQaAds();
  }

  openNewWindow() {
    cy.window().then((window) => {
      cy.stub(window, "open").as("windowOpen");
    });

    cy.get("#windowButton").should("be.visible").click();
    cy.get("@windowOpen").should("have.been.calledWith", "/sample");
  }

  validateOpenedPage() {
    cy.visit("/sample");
    cy.get("#sampleHeading")
      .should("be.visible")
      .and("have.text", "This is a sample page");
  }
}

export default new BrowserWindowsPage();
