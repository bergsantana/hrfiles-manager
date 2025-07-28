# Techs
 - Node.js
 - Nest.js
 - Mongodb
 - Docker
# Instructions
Clone esse repo:
- ` git clone https://github.com/bergsantana/hrfiles-manager.git`

Da pasta raiz:
- `npm install --legacy-peer-deps`
Edite .env.development como queira

Instale MongoDb ou se voce usa Docker use:
- `docker compose up -d` 

Comece o servidor com:
- `npm run start`"


## Requerimentos
- Adicione o prefixo da sua maquina local: localhost:3355 ou como você configurar
### Cadastro de colaborador
- POST para `/hr-files-manager/api/employee/register/` com objeto:
```
   [
    {
        "name": "José Maria",
        "cpf": "129.456.789-00",
        "hiredAt": "2021-01-15"
    }
  ]
 ```
### Atualização de colaborador
- PATCH para `/hr-files-manager/api/employee/update`
```
   [
    {
        "_id": "aaabbbcccdddeee123456"
        "name": "José Maria",
        "cpf": "129.456.789-00",
        "hiredAt": "2021-01-15"
    }
  ]
 ```
### Cadastro de tipo de documento
  - POST para `/hr-files-manager/api/hrfile/register-type`, exemplo:
```
[
  { "documentName": "Carteira de Trabalho" },
  { "documentName": "RG" },
  { "documentName": "CPF" },
]
```
### Vinculação e desvinculação de um colaborador com tipos de documentos
  - Deve ser possível vincular e desvincular mais de um tipo de documento por vez
  - POST para `/hr-files-manager/api/hrfile/save-biding-file-employee`
  - ex:
```
[
    {
        "employeeId": "688137db08012ed3d428c9ba",
        "hrFileTypeId": "688137dd08012ed3d428c9c0",
        "name": "cpf digital do gov br.pdf",
        "fileBase64": ""
    } 
]
```
### Enviar um documento relacionado ao tipo de documento e ao colaborador
  - POST para `/hr-files-manager/api/hrfile/save-biding-file-employee`
  - Preencher o atributo "fileBase64" com um representação do documento
```
[
    {
        "employeeId": "688137db08012ed3d428c9ba",
        "hrFileTypeId": "688137dd08012ed3d428c9c0",
        "name": "cpf digital do gov br.pdf",
        "fileBase64": ""
    } 
]
```
 
### Obter o status da documentação de um colaborador específico, mostrando quais foram enviados e quais ainda estão pendentes de envio
   - GET para `/hr-files-manager/api/hrfile/get-documentation-status?employeeId=id do colaborador`
   - parametro: employee
### Listar todos os documentos pendentes de todos os colaboradores
   - GET para `/hr-files-manager/api/hrfile/find-all-pending?page=1&page-size=10&employee-id= id do colaborador &file-id= id do documento`
   - id do colaborador e id do documento são opcionais
   - inclui paginação e filtros opcionais

 #### Bonus Points:

#### [x] Testes automatizados: 
 Incluso Unit Testing com Jest:
 ``` npm run test ```
#### [x] Tratamento de Erros: como você trataria os erros da sua aplicação?
 Incluso log e retorno de mensagens de error para debug  
#### [x] Documentação do Sistema: sua aplicação provavelmente precisa ser construída antes de ser executada. Você consegue documentar como outra pessoa que pegou sua aplicação pela primeira vez pode construir e executa-la?
 Incluso Documentação Swagger no link abaixo      
#### [x] Deploy: você consegue realizar o deploy da sua aplicação?
 Deploy em AWS EC2 aqui http://107.23.226.95/hr-files-manager/api/docs
 
  
