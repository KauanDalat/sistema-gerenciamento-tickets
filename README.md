# Sistema de Gestão de Tickets

Um sistema web simples, leve e interativo para registro, acompanhamento e gerenciamento de tickets de suporte ou tarefas. O design e a estrutura visual foram inspirados em planilhas corporativas clássicas, garantindo familiaridade e facilidade de uso.

## Funcionalidades

- **Cadastro de Tickets**: Permite registrar novos tickets informando número, status, data de criação, situação, categoria, conclusão e observações.
- **Edição**: O usuário pode editar qualquer campo de um ticket existente a qualquer momento.
- **Exclusão de Registros**: Botão dedicado para remover tickets com caixa de confirmação de segurança.
- **Buscador**: Filtra os tickets instantaneamente digitando o número desejado.
- **Ordenação por Data**: Organiza os registros rapidamente entre **Mais novo primeiro** e **Mais antigo primeiro**.
- **Persistência Local**: Utiliza o `localStorage` do navegador para salvar os dados automaticamente, simulando um banco de dados local sem necessidade de configuração complexa de servidores.
- **Estilização Dinâmica**: Cores customizadas baseadas na situação (ex: *Em desenvolvimento*, *Sem resposta*) e nas categorias (ex: *Inconsistência*, *Sugestão de melhoria*).

## Tecnologias Utilizadas

- **HTML5**: Estruturação semântica da página.
- **CSS3**: Estilização visual inspirada em planilhas (cores, tabelas, formulários e badges).
- **JavaScript (Vanilla)**: Lógica de manipulação do DOM, controle de estado, filtros, ordenação e persistência (`localStorage`).

## Estrutura de Arquivos

Para rodar o projeto localmente, certifique-se de manter os seguintes arquivos na mesma pasta:

index.html   # Interface do usuário (formulários, tabela e filtros)
style.css    # Estilos visuais e paleta de cores personalizada
script.js    # Lógica de funcionamento (CRUD, busca e ordenação)
