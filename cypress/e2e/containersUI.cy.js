/**
 * To test:
 *
 * 1. open a terminal and run the app to test:
 * $ npm start
 *
 * 2. open a terminal and open the cypress app:
 * $ npx cypress open
 *
 * 3. in the cypress app open the test to verify
 *
 * 4. create or modify a cypress test and cypress executes all the tests automatically
 */
const user = 'TEST_CLIENT';
const tokenUser = 'TEST_TOKEN';
describe("Cargo loading service UI", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/containers");
  });

  it("must exists a header and footer and if you click findSmallest without user error danger", () => {
    cy.getByData("headerFooter").should("exist");
    cy.getByData("config").should("exist");
    cy.getByData("yourContainers").should("exist");
    cy.getByData("containers").should("exist");
    cy.getByData("products").should("exist");
    cy.getByData("findSmallest").click();
    cy.getByData("danger").should("exist");
  });
  it("must login", () => {
    cy.getByData("config").click();
    cy.getByData("clientCodeLabel").click();
    cy.getByData("clientCode").type("TEST");
    cy.getByData("tokenLabel").click();
    cy.getByData("token").type(`${tokenUser}`);
    cy.getByData("danger").should("not.exist");
    cy.getByData("logInClient").click();
    cy.getByData("danger").should("exist");
    cy.getByData("alertClose").click();
    cy.getByData("success").should("not.exist");
    cy.getByData("clientCodeLabel").click();
    cy.getByData("clientCode").type(`${user}`);
    cy.getByData("logInClient").click();
  });
  it("must create a small and big container", () => {
    //Login
    cy.getByData("config").click();
    cy.getByData("clientCodeLabel").click();
    cy.getByData("clientCode").type(`${user}`);
    cy.getByData("tokenLabel").click();
    cy.getByData("token").type(`${tokenUser}`);
    cy.getByData("logInClient").click();
    cy.getByData("Containers").click();
    //ADD new Container small
    cy.getByData("addContainer").click();
    cy.getByData("addNewContainer").should("exist");
    cy.getByData("code").type("CypressSmall");
    cy.getByData("description").type("cypress container");
    cy.getByData("width").type("1");
    cy.getByData("length").type("1");
    cy.getByData("height").type("1");
    cy.getByData("maxWeight").type("1");
    cy.getByData("submitNewContainer").click();
    cy.getByData("success").should("exist");
    //ADD new Container big
    cy.getByData("codeLabel").click();
    cy.getByData("code").type("CypressBig");
    cy.getByData("widthLabel").click();
    cy.getByData("width").type("20");
    cy.getByData("lengthLabel").click();
    cy.getByData("length").type("20");
    cy.getByData("heightLabel").click();
    cy.getByData("height").type("20");
    cy.getByData("maxWeightLabel").click();
    cy.getByData("maxWeight").type("10");
    cy.getByData("submitNewContainer").click();
    cy.getByData("success").should("exist");
  });
  it("must find smallest successfully", () => {
    //Login
    cy.getByData("config").click();
    cy.getByData("clientCodeLabel").click();
    cy.getByData("clientCode").type(`${user}`);
    cy.getByData("tokenLabel").click();
    cy.getByData("token").type(`${tokenUser}`);
    cy.getByData("logInClient").click();
    //Find Smallest
    cy.getByData("Containers").click();
    cy.get('input[type=file]').selectFile('cypress/fixtures/products.csv', { force: true })
    cy.getByData("findSmallest").click();
    cy.getByData("success").should("exist");
  });
  it("must modify the small container", () => {
    //Login
    cy.getByData("config").click();
    cy.getByData("clientCodeLabel").click();
    cy.getByData("clientCode").type(`${user}`);
    cy.getByData("tokenLabel").click();
    cy.getByData("token").type(`${tokenUser}`);
    cy.getByData("logInClient").click();
    cy.getByData("Containers").click();
    //Modify
    cy.getByData("CypressSmall").click();
    cy.getByData("btnCypressSmall").click();
    cy.getByData("modifyContainer").click();
    cy.getByData("maxWeightLabel").click();
    cy.getByData("maxWeight").type("12");
    cy.getByData("submitMod").click();
    cy.getByData("success").should("exist");
  });
  it("must find smallest again successfully", () => {
    //Login
    cy.getByData("config").click();
    cy.getByData("clientCodeLabel").click();
    cy.getByData("clientCode").type(`${user}`);
    cy.getByData("tokenLabel").click();
    cy.getByData("token").type(`${tokenUser}`);
    cy.getByData("logInClient").click();
    //Find Smallest
    cy.getByData("Containers").click();
    cy.get('input[type=file]').selectFile('cypress/fixtures/products.csv', { force: true })
    cy.getByData("findSmallest").click();
    cy.getByData("success").should("exist");
  });
  it("must delete the two containers created", () => {
    //Login
    cy.getByData("config").click();
    cy.getByData("clientCodeLabel").click();
    cy.getByData("clientCode").type(`${user}`);
    cy.getByData("tokenLabel").click();
    cy.getByData("token").type(`${tokenUser}`);
    cy.getByData("logInClient").click();
    cy.getByData("Containers").click();
    //Delete small
    cy.getByData("CypressSmall").click();
    cy.getByData("btnCypressSmall").click();
    cy.getByData("deleteContainer").click();
    cy.getByData("deletePopUp").should("exist");
    cy.getByData("deleteYes").click();
    //Delete big
    //A chrome no funciona be ja que el nom es diferent de la label a l'hora d'afegir-ho
    cy.getByData("CypressBig").click();
    cy.getByData("btnCypressBig").click();
    cy.getByData("deleteContainer").click();
    cy.getByData("deletePopUp").should("exist");
    cy.getByData("deleteYes").click();
  });
});