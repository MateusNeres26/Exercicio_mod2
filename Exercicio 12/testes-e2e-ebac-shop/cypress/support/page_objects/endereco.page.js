class enderecoPage {
  compraProduto() {
    cy.get('[class="product-block grid"]')
      .contains("Abominable Hoodie")
      .click();
    cy.get(".button-variable-item-M").click();
    cy.get(".button-variable-item-Green").click();
    cy.get(".input-text").clear().type("4");
    cy.get(".single_add_to_cart_button").click();
    cy.get(".dropdown-toggle > .mini-cart-items").should("contain", 4);
    cy.get(".woocommerce-message").should(
      "contain",
      4 + " × “Abominable Hoodie” foram adicionados no seu carrinho."
    );
    cy.get(".woocommerce-message > .button").click();
    cy.wait(5);
    cy.get(".checkout-button").click({ force: true });
  }

  enderecoFaturamento(
    nome,
    sobrenome,
    empresa,
    pais,
    endereco,
    numero,
    cidade,
    estado,
    cep,
    telefone,
    email
  ) {
    cy.get("#billing_first_name").clear().type(nome);
    cy.get("#billing_last_name").clear().type(sobrenome);
    cy.get("#billing_company").clear().type(empresa);
    cy.get("#select2-billing_country-container")
      .click()
      .type(pais + "{enter}");
    cy.get("#billing_address_1").clear().type(endereco);
    cy.get("#billing_address_2").clear().type(numero);
    cy.get("#billing_city").clear().type(cidade);
    cy.get("#select2-billing_state-container")
      .click()
      .type(estado + "{enter}");
    cy.get("#billing_postcode").clear().type(cep);
    cy.get("#billing_phone").clear().type(telefone);
    cy.get("#billing_email").clear().type(email);
  }

  metodoPagamento() {
    cy.get("#payment_method_cod").click();
    cy.get("#terms").click();
    cy.get("#place_order").click();
  }
}

export default new enderecoPage();
