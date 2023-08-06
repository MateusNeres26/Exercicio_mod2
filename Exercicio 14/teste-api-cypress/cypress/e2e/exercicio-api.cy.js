import contrato from "../contracts/usuarios.contract";

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
        cy.request('usuarios').then(response => {
            return contrato.validateAsync(response.body)
        });
    });

    it('Deve listar usuários cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios',
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.usuarios[1].nome).to.equal("Matthew Donovan")
            expect(response.body).to.have.property("usuarios")
        });
    });

    it('Deve cadastrar um usuário com sucesso', () => {
        let email = `qa${Math.floor(Math.random() * 10000) + "@gmail.com"}`
        cy.cadastrarUsuario("Matthew Donovan", email, "Teste@123", "true")
            .then((response) => {
                expect(response.status).to.equal(201);
                expect(response.body.message).to.equal("Cadastro realizado com sucesso");
            });
    });

    it('Deve validar um usuário com email inválido', () => {
        cy.cadastrarUsuario("Matthew Donovan", "qa2723@gmail.com", "Teste@123", "true")
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal("Este email já está sendo usado");

            });
    });

    it('Deve editar um usuário previamente cadastrado', () => {
        let email = `qa${Math.floor(Math.random() * 10000) + "@gmail.com"}`
        cy.cadastrarUsuario("Matthew Donovan Novo", email,
            "Teste@123", "true")
            .then((response) => {
                let id = response.body._id;

                cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body:
                    {
                        "nome": "Matthew Donovan Novo",
                        "email": email,
                        "password": "Teste@123",
                        "administrador": "true"
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.body.message).to.equal("Registro alterado com sucesso");
                });

            });
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
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
});
