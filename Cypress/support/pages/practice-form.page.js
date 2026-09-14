import { faker } from "@faker-js/faker";

class PracticeFormPage {
  visit() {
    cy.visit("/automation-practice-form");
    cy.removeDemoQaAds();
  }

  fillWithRandomData() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const phone = faker.string.numeric(10);
    const address = faker.location.streetAddress();

    cy.get("#firstName").type(firstName);
    cy.get("#lastName").type(lastName);
    cy.get("#userEmail").type(email);
    cy.get('label[for="gender-radio-1"]').click();
    cy.get("#userNumber").type(phone);

    cy.get("#dateOfBirthInput").click();
    cy.get(".react-datepicker__year-select").select("1998");
    cy.get(".react-datepicker__month-select").select("May");
    cy.get(
      ".react-datepicker__day--015:not(.react-datepicker__day--outside-month)",
    ).click();

    cy.get("#subjectsInput").type("Maths{enter}");
    cy.get('label[for="hobbies-checkbox-1"]').click();
    cy.get("#uploadPicture").selectFile("cypress/fixtures/exemplo.txt", {
      force: true,
    });
    cy.get("#currentAddress").type(address);
    cy.get("#react-select-3-input").type("NCR{enter}", { force: true });
    cy.get("#react-select-4-input").type("Delhi{enter}", { force: true });

    return { firstName, lastName, email, phone, address };
  }

  submit() {
    cy.get("#submit").scrollIntoView().click({ force: true });
  }

  validateSubmission(data) {
    cy.get(".modal-content").should("be.visible");
    cy.get("#example-modal-sizes-title-lg").should(
      "have.text",
      "Thanks for submitting the form",
    );

    cy.get(".table-responsive").within(() => {
      cy.contains("Student Name")
        .parent()
        .should("contain.text", `${data.firstName} ${data.lastName}`);
      cy.contains("Student Email").parent().should("contain.text", data.email);
      cy.contains("Mobile").parent().should("contain.text", data.phone);
    });
  }
}

export default new PracticeFormPage();
