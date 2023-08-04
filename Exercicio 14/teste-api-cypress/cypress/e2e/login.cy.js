

describe('Login - Testes da API ServRest', () => {



  it('Deve fazer login com sucesso', () => {

    cy.request({
      method: 'POST',
      url: 'login',
      body:
      {
        "email": "beltranoe@qa.com.br",
        "password": "teste"
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Login realizado com sucesso");
      cy.log(response.body.authorization);
    })


  });

});