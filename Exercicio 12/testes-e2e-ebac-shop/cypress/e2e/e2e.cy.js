import enderecoPage from "../../cypress/support/page_objects/Endereco.page";
import metodoPagamentoPage from "../../cypress/support/page_objects/MetodoPagamento.page";

const dadosEndereco = require("../../cypress/fixtures/endereco.json");

context("Exercicio - Testes End-to-end - Fluxo de pedido", () => {
  /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

  beforeEach(() => {
    cy.visit("produtos");
  });

  it("Deve fazer um pedido na loja Ebac Shop de ponta a ponta", () => {
    cy.adicionarProduto("Abominable Hoodie", 4)
    enderecoPage.enderecoFaturamento(
      dadosEndereco[2].nome,
      dadosEndereco[2].sobrenome,
      dadosEndereco[2].empresa,
      dadosEndereco[2].pais,
      dadosEndereco[2].endereco,
      dadosEndereco[2].numero,
      dadosEndereco[2].cidade,
      dadosEndereco[2].estado,
      dadosEndereco[2].cep,
      dadosEndereco[2].telefone,
      dadosEndereco[2].email
    );
    metodoPagamentoPage.metodoPagamento();
    cy.get(".woocommerce-notice").should(
      "contain",
      "Obrigado. Seu pedido foi recebido."
    );
  });
});
