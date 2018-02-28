describe('Filter by payment id and validate after login to application', () => {

    it.only('Successful login followed by payment filter and validate', () => {
        cy.fixture('testData').then(testData => {
            cy.launchAndlogin(testData.userEmail, testData.userPassword)
            cy.navigateToPaymentList()
            cy.filterPaymentsById(testData.paymentId)
            cy.validateFirstRecord()
        });
    });

});