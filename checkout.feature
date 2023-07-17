#language: pt
Funcionalidade: Tela de cadastro - Checkout
  Como cliente da EBAC-SHOP
  Quero fazer concluir meu cadastro
  Para finalizar minha compra

  Contexto:
    Dado que eu acesse a página de cadastro - checkout do portal EBAC

  Esquema do Cenário:
    Quando eu preencher todos os campos <Nome>,<Sobrenome>, <País>, <Endereço>, <Cidade>, <CEP>, <Telefone> <Endereço de e-mail>  obrigatórios
    Então devo conseguir finalizar a compra

    Exemplos:
      | Nome  | Sobrenome | País   | Endereço               | Cidade         | CEP       | Telefone       | Endereço de e-mail     |
      | João  | Silva     | Brasil | Rua Principal, 123     | São Paulo      | 01234-567 | (11) 9876-5432 | joao.silva@example.com |
      | Pedro | Santos    | Brasil | Travessa Principal, 67 | Salvador       | 40000-789 | (71) 9876-5432 | pedro.12@teste.com     |
      | Maria | Souza     | Brasil | Avenida Secundária, 45 | Rio de Janeiro | 21000-123 | (21) 9876-5432 | maria@silva.com        |

  Cenário: Cadastro com formato de email inválido
    Quando eu digitar um email inválido "xxxyyyzzzebac.com.br"
    Então deve exibir uma mensagem de erro: "Email com formato incorreto"


  Cenário: Cadastro com campos vazios
    Quando eu digitar deixar de preencher todos os campos
    Então devo ver uma mensagem de alerta




