# Hello 

#### Introdução


Muito obrigado por separar um tempo para ver meu repositório, saiba que esse código aqui gerado foi feito pela minha melhor e mais recente versão. Talvez eu tenha deixado passar alguns bugs, mas fazer o'que, foi pouco tempo! 

Queria agradecer também a oportunidade, nunca tinha participado de um desafio como esse para falar a verdade, gostei muito, mas vamos para oque interessa!

#### Sobre o frontend

O frontend dessa aplicação foi desenvolvido com nextJS, eu procurei usar packages somente no que fosse necessário, mas também quis mostrar um desenvolvimento agil que é oque as empresas precisam hoje em dia. Então você vai encontrar tanto códigos vanilla como uns NPM da vida, sobre os pacotes podemos listar:
 -  Material UI
 -  Material Icons
 -  React Hook Form
 -  SweetAlerts 2 

Procurei usar o gerenciamento de estado vanilla do react que é o use context pois não achei necessário o uso de redux, e também me concentrei em deixar a aplicação com um container global, para simular mesmo um software simples.

#### Como roda o frontend

Para rodar o front você deve ter o docker instalado, execute os seguintes comandos:

 - docker build -t client .

 - docker run --name CLIENT_CONTAINER -p 0.0.0.0:3000:3000 client

Lembrando que o backend deve estar em funcionamento, para acessar a aplicação vá para o caminho http://localhost:5000/main em seu navegador

#### Sobre testes

Para execução dos testes te aconselho fazer isso no seu ambiente local! Então siga os passos abaixo (a aplicação deve estar em funcionamento, tanto o backend como o frontend)

- yarn run-tests
