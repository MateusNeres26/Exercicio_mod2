#language: pt
Funcionalidade: Tela de login
  Como cliente da EBAC-SHOP
  Quero fazer o login (autenticação) na plataforma
  Para visualizar meus pedidos

  Contexto:
  Dado que eu acesse a página de autenticação do portal EBAC

  Cenário: Autenticação válida
  Quando eu digitar o usuário "joão@ebac.com.br"
  E a senha "senha@123"
  Então devo ser direcionado para a tela de checkout

Cenário: Usuário inexistente
  Quando eu digitar o usuário "xxxyyyzzz@ebac.com.br"
  E a senha "senha@123"
  Então deve exibir uma mensagem de alerta: "Usuário ou senha inválidos"


Cenário: Usuário com senha inválida
  Quando eu digitar o usuário "joao@ebac.com.br"
  E a senha "huehueheu"
  Então deve exibir uma mensagem de alerta: "Usuário ou senha inválidos"

  Esquema do Cenário: Autenticar multiplos usuários
    Quando eu digitar o <usuario>
    E a <senha>
    Então deve exibir a <mensagem> de alerta

    Exemplos:
      | usuario             | senha        | mensagem                     |
      | "joao@ebac.com.br"  | "teste@123e" | "Usuário ou senha inválidos" |
      | "maria@ebac.com.br" | "teste@123d" | "Usuário ou senha inválidos" |
      | "joao@ebac.com.br"  | "teste@123d" | "Usuário ou senha inválidos" |

