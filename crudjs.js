// Adiciona um evento que será disparado quando o DOM for completamente carregado
document.addEventListener("DOMContentLoaded", () => {
    listarTodos(); // Chama a função listarTodos
});

// Função para listar todos os usuários
function listarTodos() {
    // Faz uma requisição GET para "listar.php" e define o cabeçalho
    fetch("listar.php", // URL para onde a requisição será enviada
        {
            method: "GET", // Método HTTP utilizado para a requisição
            headers: { 'Content-Type': "application/json; charset=UTF-8" } // Cabeçalhos da requisição
        }
    )
        // Converte a resposta para JSON
        .then(response => response.json()) // response.json() converte a resposta em um objeto JSON
        // Chama a função inserirUsuarios com os dados recebidos
        .then(usuarios => inserirUsuarios(usuarios)) // Callback executado ao receber os dados em formato JSON
        // Captura e exibe erros
        .catch(error => console.log(error)); // Captura erros durante o processo e os exibe no console
}

// Função para inserir todos os usuários na tabela
function inserirUsuarios(usuarios) {
    // Itera sobre cada usuário e chama a função inserirUsuario
    for (const usuario of usuarios) { // for...of itera sobre valores de um objeto iterável como arrays
        inserirUsuario(usuario);
    }
}

// Função para inserir um usuário na tabela
function inserirUsuario(usuario) {
    let tbody = document.getElementById('ficcao'); // Obtém o elemento tbody com id 'ficcao'
    let tr = document.createElement('tr'); // Cria uma nova linha na tabela

    // Cria células na linha e insere os dados do usuário
    let tdId = document.createElement('td'); // Cria um novo elemento de célula de tabela
    tdId.innerHTML = usuario.id_usuario; // Define o conteúdo HTML da célula

    let tdNome = document.createElement('td');
    tdNome.innerHTML = usuario.nome; // Define o conteúdo HTML da célula com o nome do usuário

    let tdEmail = document.createElement('td');
    tdEmail.innerHTML = usuario.email; // Define o conteúdo HTML da célula com o email do usuário

    // Cria botões para alterar e excluir o usuário
    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar"; // Define o texto do botão

    // Adiciona evento de clique ao botão de alterar
    btnAlterar.addEventListener("click", buscaUsuario, false); // Adiciona um ouvinte de eventos de clique ao botão
    btnAlterar.id_usuario = usuario.id_usuario; // Adiciona a propriedade id_usuario ao botão
    tdAlterar.appendChild(btnAlterar); // Adiciona o botão à célula

    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.addEventListener("click", excluir, false); // Adiciona um ouvinte de eventos de clique ao botão
    btnExcluir.id_usuario = usuario.id_usuario; // Adiciona a propriedade id_usuario ao botão
    btnExcluir.innerHTML = "Excluir"; // Define o texto do botão
    tdExcluir.appendChild(btnExcluir); // Adiciona o botão à célula

    // Adiciona as células à linha
    tr.appendChild(tdId); // Adiciona a célula com o id à linha
    tr.appendChild(tdNome); // Adiciona a célula com o nome à linha
    tr.appendChild(tdEmail); // Adiciona a célula com o email à linha
    tr.appendChild(tdAlterar); // Adiciona a célula com o botão de alterar à linha
    tr.appendChild(tdExcluir); // Adiciona a célula com o botão de excluir à linha

    // Adiciona a linha ao corpo da tabela
    tbody.appendChild(tr); // Adiciona a linha ao elemento tbody
}

// Função para excluir um usuário
function excluir(evt) {
    let id_usuario = evt.currentTarget.id_usuario; // Obtém o ID do usuário a partir do evento
    let excluir = confirm("Você tem certeza que deseja excluir este usuário?"); // Exibe uma caixa de confirmação
    if (excluir == true) {
        // Faz uma requisição GET para "excluir.php" com o ID do usuário
        fetch('excluir.php?id_usuario=' + id_usuario, // URL para onde a requisição será enviada com o ID do usuário
            {
                method: "GET", // Método HTTP utilizado para a requisição
                headers: { 'Content-Type': "application/json; charset=UTF-8" } // Cabeçalhos da requisição
            }
        )
            // Converte a resposta para JSON
            .then(response => response.json()) // response.json() converte a resposta em um objeto JSON
            // Chama a função excluirUsuario com a resposta e o ID do usuário
            .then(retorno => excluirUsuario(retorno, id_usuario)) // Callback executado ao receber os dados em formato JSON
            // Captura e exibe erros
            .catch(error => console.log(error)); // Captura erros durante o processo e os exibe no console
    }
}

// Função para remover um usuário da tabela se a exclusão foi bem-sucedida
function excluirUsuario(retorno, id_usuario) {
    if (retorno == true) { // Verifica se a exclusão foi bem-sucedida
        let tbody = document.getElementById('usuarios'); // Obtém o corpo da tabela
        // Itera sobre as linhas da tabela
        for (const tr of tbody.children) { // for...of itera sobre valores de um objeto iterável como arrays
            // Remove a linha que contém o ID do usuário
            if (tr.children[0].innerHTML == id_usuario) { // Verifica se a célula contém o ID do usuário
                tbody.removeChild(tr); // Remove a linha do tbody
            }
        }
    }
}

// Função para atualizar os dados do usuário na tabela
function alterarUsuario(usuario) {
    let tbody = document.getElementById('usuarios'); // Obtém o corpo da tabela
    // Itera sobre as linhas da tabela
    for (const tr of tbody.children) { // for...of itera sobre valores de um objeto iterável como arrays
        // Atualiza as células da linha que contém o ID do usuário
        if (tr.children[0].innerHTML == usuario.id_usuario) { // Verifica se a célula contém o ID do usuário
            tr.children[1].innerHTML = usuario.nome; // Atualiza o nome do usuário
            tr.children[2].innerHTML = usuario.email; // Atualiza o email do usuário
        }
    }
}

// Função para buscar os dados de um usuário específico
function buscaUsuario(evt) {
    let id_usuario = evt.currentTarget.id_usuario; // Obtém o ID do usuário a partir do evento
    // Faz uma requisição GET para "buscaUsuario.php" com o ID do usuário
    fetch('buscaUsuario.php?id_usuario=' + id_usuario, // URL para onde a requisição será enviada com o ID do usuário
        {
            method: "GET", // Método HTTP utilizado para a requisição
            headers: { 'Content-Type': "application/json; charset=UTF-8" } // Cabeçalhos da requisição
        }
    )
        // Converte a resposta para JSON
        .then(response => response.json()) // response.json() converte a resposta em um objeto JSON
        // Chama a função preencheForm com os dados do usuário
        .then(usuario => preencheForm(usuario)) // Callback executado ao receber os dados em formato JSON
        // Captura e exibe erros
        .catch(error => console.log(error)); // Captura erros durante o processo e os exibe no console
}

// Função para preencher um formulário com os dados do usuário
function preencheForm(usuario) {
    let inputIDUsuario = document.getElementsByName("id_usuario")[0]; // Obtém o input com o nome 'id_usuario'
    inputIDUsuario.value = usuario.id_usuario; // Define o valor do input com o ID do usuário

    let inputNome = document.getElementsByName("nome")[0]; // Obtém o input com o nome 'nome'
    inputNome.value = usuario.nome; // Define o valor do input com o nome do usuário

    let inputEmail = document.getElementsByName("email")[0]; // Obtém o input com o nome 'email'
    inputEmail.value = usuario.email; // Define o valor do input com o email do usuário
}

// Função para salvar ou alterar um usuário
function salvarUsuario(event) {
    event.preventDefault(); // Para o comportamento padrão do formulário

    // Obtém os valores dos inputs
    let inputIDUsuario = document.getElementsByName("id_usuario")[0]; // Obtém o input com o nome 'id_usuario'
    let id_usuario = inputIDUsuario.value; // Define o valor do input com o ID do usuário

    let inputNome = document.getElementsByName("nome")[0]; // Obtém o input com o nome 'nome'
    let nome = inputNome.value; // Define o valor do input com o nome do usuário

    let inputEmail = document.getElementsByName("email")[0]; // Obtém
}