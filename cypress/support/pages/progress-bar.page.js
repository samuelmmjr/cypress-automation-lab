class ProgressBarPage {
  visit() {
    cy.visit("/progress-bar");
    cy.removeDemoQaAds();
  }

  start() {
    cy.get("#startStopButton").should("have.text", "Start").click();
  }

  stopBefore25Percent() {
    cy.get("#progressBar .progress-bar").should(($bar) => {
      const value = Number.parseInt($bar.attr("aria-valuenow"), 10);
      expect(value).to.be.within(1, 24);
    });

    cy.get("#startStopButton").click();
  }

  validateStoppedBefore25Percent() {
    cy.get("#progressBar .progress-bar")
      .invoke("attr", "aria-valuenow")
      .then(Number)
      .should("be.lessThan", 25);
  }

  resumeAndWaitUntilComplete() {
    cy.get("#startStopButton").click();
    cy.get("#progressBar .progress-bar", { timeout: 15000 })
      .should("have.attr", "aria-valuenow", "100")
      .and("have.text", "100%");
  }

  reset() {
    const clickReset = (attempt = 1) => {
      cy.get("#resetButton")
        .should("be.visible")
        .and("have.text", "Reset")
        .click({ force: true });

      cy.get("body").then(($body) => {
        const resetStillExists = $body.find("#resetButton").length > 0;

        if (resetStillExists && attempt < 2) {
          clickReset(attempt + 1);
        }
      });
    };

    clickReset();

    cy.get("#startStopButton").should("be.visible").and("have.text", "Start");

    cy.get("#progressBar .progress-bar")
      .should("have.attr", "aria-valuenow", "0")
      .and("have.attr", "style", "width: 0%;")
      .and("have.text", "0%");
  }
}

export default new ProgressBarPage();
