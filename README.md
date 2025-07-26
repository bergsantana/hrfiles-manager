# Techs
 - Node.js
 - Nest.js
 - Mongodb
 - Docker
# Instructions
Clone esse repo:
- ` git clone https://github.com/bergsantana/hrfiles-manager.git`

Da pasta raiz:
- `npm install   --legacy-peer-deps`
Edite .env.development como queira

Instale MongoDb ou se voce usa Docker use:
- `docker compose up -d` 

Comece o servidor com:
- `npm run start`"


## Requerimentos
- Adicione o prefixo da sua maquina local: localhost:3355 ou como você configurar
### Cadastro de colaborador
- POST para `/hr-files-manager/api/employee/register/`
### Cadastro de tipo de documento
 - PATCH para `/hr-files-manager/api/employee/update`
### Cadastro de tipo de documento
  - POST para `/hr-files-manager/api/hrfile/register-type`
### Vinculação e desvinculação de um colaborador com tipos de documentos
  - Deve ser possível vincular e desvincular mais de um tipo de documento por vez
  - POST para `/hr-files-manager/api/hrfile/save-biding-file-employee`
### Enviar um documento relacionado ao tipo de documento e ao colaborador
  - POST para `/hr-files-manager/api/hrfile/save-biding-file-employee`
  - Preencher o atributo "fileBase64" com um representação do documento
### Obter o status da documentação de um colaborador específico, mostrando quais foram enviados e quais ainda estão pendentes de envio
   - GET para `/hr-files-manager/api/hrfile/get-documentation-status?employeeId=id do colaborador`
### Listar todos os documentos pendentes de todos os colaboradores
   - GET para `/hr-files-manager/api/hrfile/find-all-pending?page=1&page-size=10&employee-id= id do colaborador &file-id= id do documento`
   - id do colaborador e id do documento são opcionais
   - inclui paginação e filtros opcionais

 #### Bonus Points:

#### [x] Testes automatizados: 
 Incluso Unit Testing com Jest
#### [x] Tratamento de Erros: como você trataria os erros da sua aplicação?
 Incluso log e retorno de mensagens de error para debug
#### [x] Documentação do Sistema: sua aplicação provavelmente precisa ser construída antes de ser executada. Você consegue documentar como outra pessoa que pegou sua aplicação pela primeira vez pode construir e executa-la?
 Incluso Documentação Swagger com instruções de uso e endpoints(ListAll para empregados e documentos) para facilitar      
#### [x] Deploy: você consegue realizar o deploy da sua aplicação?
 Deploy em AWS EC2 aqui https://107.23.226.95:3355/hr-files-manager/api
 
  
