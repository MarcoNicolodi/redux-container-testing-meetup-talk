describe("As a quality manager, i want to list the company documents, to ensure the processes are documented", () => {
  it("GIVEN that im on listing page, WHEN i visit the page, THEN i should see first page documents", () => {
    cy.visit("localhost:8080");
    cy.get("li.rc-pagination-simple-pager input").should("have.value", "1");
    cy.contains("Document list");
    cy.contains("PO0003");
  });

  it("GIVEN that im on listin page, WHEN i click the next button, THEN i should see second page documents", () => {
    cy.visit("localhost:8080");
    cy.get("table");
    cy.get("button#pagination-next-button").click();
    cy.get("li.rc-pagination-simple-pager input").should("have.value", "2");
    cy.get("table").contains("FP0034");
  });

  it("GIVEN that im on listing page, WHEN i fill the page input with page 3 and press enter, THEN i should see third page documents", () => {
    cy.visit("localhost:8080");
    cy.get("table");
    cy
      .get("li.rc-pagination-simple-pager input")
      .type("{backspace}")
      .type("3")
      .type("{enter}")
      .should("have.value", "3");
    cy.get("table").contains("PD0001");
  });

  it("GIVEN that im on listing page, WHEN am in page 2 and i press the back button, THEN i should see page 1 documents", () => {
    cy.visit("localhost:8080");
    cy.get("table");
    cy.get("button#pagination-next-button").click();
    cy.get("li.rc-pagination-simple-pager input").should("have.value", "2");
    cy.get("table").contains("FP0034");
    cy.get("button#pagination-previous-button").click();
    cy.get("table").contains("PO0003");
  });

  it("GIVEN that im on listing page, WHEN i filter a document that exists, THEN i should see filtered documents", () => {
    cy.visit("localhost:8080");
    cy.get("table");
    cy
      .get("input#filter-input")
      .type("contrato")
      .type("{enter}");
    cy.get("table").contains("Contrato de Prestação de Serviços");
    cy.get("table").contains("Aditivo ao Contrato de Prestação de Serviços");
  });

  it("GIVEN that im on listing page, WHEN i filter a document that doesnt exist, THEN i should see a no results alert", () => {
    cy.visit("localhost:8080");
    cy.get("table");
    cy
      .get("input#filter-input")
      .type("non existing title")
      .type("{enter}");
    cy.contains("No results found");
  });

  it("GIVEN that im on listing page, WHEN the api responds with error, THEN i should see an error alert", () => {
    cy.server();
    cy.route({
      url: "**/api/documents/?page=1&status=1",
      status: 500,
      response: []
    });
    cy.visit("localhost:8080");
    cy.contains("We had a problem in our servers");
  });
});
