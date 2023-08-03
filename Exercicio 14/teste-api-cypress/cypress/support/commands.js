// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('token', (email, senha) => {

    cy.request({
        method: 'POST',
        url: 'login',
        body:
        {
            "email": email,
            "password": senha
        }
    }).then((response) => {
        expect(response.status).to.equal(200);
        return response.body.authorization

    })

});


Cypress.Commands.add('cadastrarProduto', (token, produto, preco, descricao, quantidade) => {


    cy.request({
        method: 'POST',
        url: 'produtos',
        headers: { authorization: token },
        body:
        {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
        },
        failOnStatusCode: false
    })

})



Cypress.Commands.add('cadastrarUsuario', (nome, email, senha, administrador) => {
    cy.request({
        method: 'POST',
        url: 'usuarios',
        body:
        {
            "nome": nome,
            "email": email,
            "password": senha,
            "administrador": administrador
        },
        failOnStatusCode: false

    });
});

Cypress.Commands.add('editarUsuario', (nome, email, senha, administrador) => {
    let email1 = `qa${Math.floor(Math.random() * 10000) + "@gmail.com"}`
    cy.cadastrarUsuario("Matthew Donovan Novo", email1,
        "Teste@123", "true")
        .then((response) => {
            let id = response.body._id;

            cy.request({
                method: 'PUT',
                url: `usuarios/${id}`,
                body:
                {
                    "nome": nome,
                    "email": email,
                    "password": senha,
                    "administrador": administrador
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.body.message).to.equal("Registro alterado com sucesso");
            });

        });
});

Cypress.Commands.add('deletarUsuario', () => {
    let email1 = `qa${Math.floor(Math.random() * 10000) + "@gmail.com"}`
    cy.cadastrarUsuario("Matthew Delete", email1,
        "Teste@123", "true")
        .then((response) => {
            let id = response.body._id;

            cy.request({
                method: 'DELETE',
                url: `usuarios/${id}`,


            }).then((response) => {
                expect(response.body.message).to.equal("Registro excluído com sucesso");
            });

        });
});


