import contrato from "../contracts/produtos.contract";
describe('Testes da Funcionalidade Produtos', () => {

    let token
    before(() => {
        cy.token('beltranoe@qa.com.br', 'teste').then(tkn => { token = tkn });
    });

    it('Deve validar contrato de produtos', () => {
        cy.request('produtos').then(response => {
            return contrato.validateAsync(response.body)
        });
    });

    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',

        }).then((response) => {
            expect(response.body.produtos[1].nome).to.equal("Produto EBAC Novo 3")
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("produtos")
            expect(response.duration).to.be.lessThan(20)
        });
    });

    it('Cadastrar produto', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}`
        cy.request({
            method: 'POST',
            url: 'produtos',
            body:
            {
                "nome": produto,
                "preco": 200,
                "descricao": "produto",
                "quantidade": 100
            },
            headers: { authorization: token }
        }).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.message).to.equal("Cadastro realizado com sucesso");
            cy.log(response.body.authorization);
        })
    });


    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: { authorization: token },
            body:
            {
                "nome": "Produto EBAC Novo 1",
                "preco": 200,
                "descricao": "produto",
                "quantidade": 100
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal("Já existe produto com esse nome");
            cy.log(response.body.authorization);
        })
    });


    it('Cadastro pelo commands', () => {
        cy.cadastrarProduto(token, 'Produto EBAC Novo 1',
            250, 'Descricao do produto novo', 180)

            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal("Já existe produto com esse nome");
                cy.log(response.body.authorization);
            })
    });

    it('Deve editar um produto já cadastrado', () => {
        cy.request('produtos').then(response => {
            let id = response.body.produtos[0]._id;
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: { authorization: token },
                body:
                {
                    "nome": "Produto EBAC Novo 3",
                    "preco": 100,
                    "descricao": "produto editado",
                    "quantidade": 1001
                }
            }).then((response) => {
                expect(response.body.message).to.equal("Registro alterado com sucesso");
            })
        });
    });

    it('Deve editar um produto cadastrado previamente', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}`
        cy.cadastrarProduto(token, produto,
            250, 'Descricao do produto novo', 180)
            .then((response) => {
                let id = response.body._id

                cy.request({
                    method: 'PUT',
                    url: `produtos/${id}`,
                    headers: { authorization: token },
                    body:
                    {
                        "nome": produto,
                        "preco": 200,
                        "descricao": "produto editado",
                        "quantidade": 10011
                    }
                }).then((response) => {
                    expect(response.body.message).to.equal("Registro alterado com sucesso");
                });
            });
    });

    it('Deve deletar um produto previamente cadastrado', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}`
        cy.cadastrarProduto(token, produto,
            250, 'Descricao do produto novo', 180)
            .then((response) => {
                let id = response.body._id

                cy.request({
                    method: 'DELETE',
                    url: `produtos/${id}`,
                    headers: { authorization: token },
                
                }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal("Registro excluído com sucesso");
                });
            });
    });


});