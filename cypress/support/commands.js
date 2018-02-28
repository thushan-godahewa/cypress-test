Cypress.Commands.add('launchAndlogin', (email, password) => {
    cy.visit('/')
    cy.fixture('uiProperties').then(uiProperties => {
        cy.get(uiProperties.loginLink).click()
        cy.get(uiProperties.loginEmail).type(email)
        cy.get(uiProperties.loginPassword).type(password)
        cy.get(uiProperties.loginButton).click()
        cy.get(uiProperties.loggedInUserProfile).should('contain', email)
    });
  });

Cypress.Commands.add('navigateToPaymentList', () => {
    cy.fixture('uiProperties').then(uiProperties => {
        cy.get(uiProperties.paymentsLink).click()
        cy.get(uiProperties.paymentsListLink).click()
        cy.url().should('include', uiProperties.paymentsListPath)
    });
});

Cypress.Commands.add('filterPaymentsById', (paymentId) => {
    cy.fixture('uiProperties').then(uiProperties => {
        cy.contains(uiProperties.filterButtonLabel).click()
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('Uncaught application exception during payment id tye in')
            done()
            //We do not need to fail the test as this exception does not prevent test continuity
            return false
        });
        cy.get(uiProperties.paymentIdTextField).type(paymentId)
        cy.contains(uiProperties.applyFiltersButton).click()
        cy.contains(uiProperties.paymentIdField).should('be.visible')
        cy.contains(paymentId).should('be.visible')
    });
});

Cypress.Commands.add('validateFirstRecord', () => {
    const amountString = fn(1000)
    cy.fixture('expectedTestData').then(expectedTestData => {
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('Uncaught application exception during payment id tye in')
            done()
            //We do not need to fail the test as this exception does not prevent test continuity
            return false
        });
        cy.get('#PaymentsList_PaymentsTable').find('table>tbody>tr').eq(1)
        .children('td').eq(0).should('contain', expectedTestData.beneficiary.shortReferenceId)
        cy.get('#PaymentsList_PaymentsTable').find('table>tbody>tr').eq(1)
        .children('td').eq(1).should('contain', expectedTestData.beneficiary.paymentDate)
        cy.get('#PaymentsList_PaymentsTable').find('table>tbody>tr').eq(1)
        .children('td').eq(2).should('contain', (expectedTestData.beneficiary.reference).indexOf("USD") !== -1 ? "USD" : "AUD")
        cy.get('#PaymentsList_PaymentsTable').find('table>tbody>tr').eq(1)
        .children('td').eq(3).should('contain', amountString)
        cy.get('#PaymentsList_PaymentsTable').find('table>tbody>tr').eq(1)
        .children('td').eq(4).should('contain', expectedTestData.beneficiary.companyName)
        cy.get('#PaymentsList_PaymentsTable').find('table>tbody>tr').eq(1)
        .children('td').eq(5).should('contain', expectedTestData.beneficiary.status)
    });
});

const fn = (amount) => {
    var amountWithTwoDecimalPlaces = parseFloat(Math.round(amount * 100) / 100).toFixed(2);
    var amountParts = amountWithTwoDecimalPlaces.toString().split(".");
    amountParts[0] = amountParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "$" + amountParts.join(".");
}