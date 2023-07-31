class metodoPagamentoPage {


    metodoPagamento() {
        cy.get("#payment_method_cod").click();
        cy.get("#terms").click();
        cy.get("#place_order").click();
    }
}

export default new metodoPagamentoPage();
