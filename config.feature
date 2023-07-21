#language: pt

Funcionalidade: Configurar Produto
  Como cliente da EBAC-SHOP
  Quero configurar meu produto de acordo com meu tamanho e gosto
  E escolher a quantidade
  Para depois inserir no carrinho

  Contexto:
    Dado que eu esteja na EBAC-Shop

  Esquema do Cenário: Seleções de cor, tamanho e quantidade devem ser obrigatórios
    Quando eu selecionar <cor>, <tamanho>, <quantidade>
    Então o campo deve ser obrigatório

    Exemplos:
      | cor    | tamanho | quantidade |
      | Blue   | XS      | 1          |
      | Red    | S       | 2          |
      | Orange | M       | 3          |
      |        | L       | 4          |
      |        | XL      | 5          |


  Cenario: Deve permitir 10 produtos por venda
    Quando eu selecionar até 10 produtos
    Então devo conseguir realizar a compra

  Cenario: Deve esvaziar carrinho ao clicar em limpar
    Quando eu clicar no botão limpar
    Então devo ver o carrinho vazio

