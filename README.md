# Meu Front-end em React

Essa app faz parte de um pequeno projeto para ter um controle das medicações de uma pessoa, composto por um front(app_medicacao_front) e tres apis (remedio_api, medicamento_apio, gateway_api) e um api externo (googleapis)

O objetivo do sistema é controlar a medicação de um paciente, o primeiro passo é cadastrar os remedios, o segundo passo é cadastrar a medicação selecioando o remedio, a data inicio da medicação a quantidade de dias e a quantidade de  vezes ao dia, o 3 passo é montar a grade com todos os medicamento cadastrados com a possibilidade de impressão.
Tem a funcionalidade de localizar a farmacia mais perto passando o cep.

OBS: 3 passo não foi desenvolvido.


Esse app chama o gateway_api para retornar todos os dados para montar as telas.


## Como executar

Será necessário ter o [Nodejs, ou o npm,] instalado. 

Após clonar o repositório, é necessário ir ao diretório raiz desse projeto pelo terminal para poder executar os comandos descritos abaixo.

```
$ npm install
```

Este comando instala as dependências/bibliotecas, descritas no arquivo `package.json`. Uma pasta chamada `node_modules` será criada.

Para executar a interface basta executar o comando: 

```
$ npm start
```

Abra o [http://localhost:3000/#/](http://localhost:3000/#/) no navegador.


## Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.



Para roda o docker do app:
Navegue até o diretório que contém o Dockerfile e o package no terminal.
Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t app_medicacao_front .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:
OBS: 1  --network: estou definindo uma rede comum para todos os containeres para ter comunicação entre eles.

Caso nao tenha criado a rede executar o comando
```
docker network create mvp3medicamento
```

```
$ docker run -d -p 3000:3000 --name app_medicacao_front --network mvp3medicamento app_medicacao_front
  
```
Abra o [http://localhost:3000/#/](http://localhost:3000/#/) no navegador.

