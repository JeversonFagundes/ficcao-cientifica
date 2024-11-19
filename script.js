
/*
Essa linha de código adiciona um evento que será acionado quando todo o conteúdo do DOM (Document Object Model) for carregado e analisado. A função associada a esse evento (listarTodos) será chamada imediatamente após o carregamento do DOM, garantindo que todos os elementos HTML estejam disponíveis para manipulação.
*/
document.addEventListener("DOMContentLoaded", () => {
    listarTodos();
});

//Esta função faz uma solicitação assíncrona para buscar dados do servidor e processá-los.
function listarTodos() {

    fetch("listar.php",

        /*
        Inicia uma solicitação HTTP para o arquivo listar.php usando o método GET.

        Define o cabeçalho Content - Type como application / json; charset = UTF - 8, indicando que o servidor deve retornar dados no formato JSON.
        */
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )

        /*Quando a resposta do servidor é recebida, essa linha converte a resposta em um objeto JSON. A conversão é necessária para transformar os dados brutos em um formato que pode ser manipulado pelo JavaScript. */
        .then(response => response.json())

        /*
        Após a conversão para JSON, os dados (no caso, usuarios) são passados como argumento para a função inserirUsuarios.

        inserirUsuarios é chamada para processar e inserir os dados dos usuários no local apropriado, possivelmente em uma tabela ou lista na página.
        */
        .then(usuarios => inserirUsuarios(usuarios))

        //Se houver algum erro durante a solicitação ou a conversão, ele é capturado e registrado no console, permitindo a depuração.
        .catch(error => console.log(error));
}

//Esta função é responsável por iterar sobre uma lista de usuários e chamar outra função (inserirUsuario) para inserir cada usuário individualmente na interface HTML.
function inserirUsuarios(usuarios) {

    //inserirUsuarios: Itera sobre uma lista de usuários e chama inserirUsuario para cada usuário.

    /*
    for (const usuario of usuarios) {
    inserirUsuario(usuario);
    }
    A função recebe um array usuarios como parâmetro.

    Usa um loop for...of para iterar sobre cada objeto usuario no array.

    Para cada usuario, chama a função inserirUsuario, passando o objeto usuario como argumento.
    */
    for (const usuario of usuarios) {
        inserirUsuario(usuario);
    }

}

//Esta função é responsável por criar e inserir elementos HTML correspondentes às informações de um usuário dentro de uma tabela na página.
function inserirUsuario(usuario) {

    //inserirUsuario: Cria e insere elementos HTML correspondentes a um usuário específico na tabela.

    //Obter o elemento <tbody> da tabela.
    //Obtém a referência ao elemento <tbody> da tabela com o ID usuarios.
    let tbody = document.getElementById('usuarios');

    //Criar uma nova linha de tabela (<tr>):
    //Cria um novo elemento de linha (<tr>).
    let tr = document.createElement('tr');

    //Criar e preencher as células da linha (<td>):

    //Para o ID do usuário:
    let tdId = document.createElement('td');
    tdId.innerHTML = usuario.id_usuario;

    //Para o nome do usuário:
    let tdNome = document.createElement('td');
    tdNome.innerHTML = usuario.nome;

    //Para o email do usuário:
    let tdEmail = document.createElement('td');
    tdEmail.innerHTML = usuario.email;

    //Criar a célula e botão de "Alterar":

    /*
    Cria um elemento de botão (<button>) e define seu texto como "Alterar".

    Adiciona um evento click ao botão, que chama a função buscaUsuario quando clicado.

    Define o ID do usuário no botão.

    Adiciona o botão à célula (<td>).
    */
    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.addEventListener("click", buscaUsuario, false);
    btnAlterar.id_usuario = usuario.id_usuario;
    tdAlterar.appendChild(btnAlterar);

    //Criar a célula e botão de "Excluir":

    //Similar ao botão de "Alterar", mas com texto "Excluir" e chamando a função excluir quando clicado.
    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.addEventListener("click", excluir, false);
    btnExcluir.id_usuario = usuario.id_usuario;
    btnExcluir.innerHTML = "Excluir";
    tdExcluir.appendChild(btnExcluir);

    //Adicionar as células à linha (<tr>):
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);

    //Adicionar a linha (<tr>) ao <tbody>:
    tbody.appendChild(tr);
}

//Esta função é chamada quando um evento de clique é disparado em um botão de exclusão.
function excluir(evt) {

    //Função excluir(evt): Garante que o usuário deseja realmente excluir um usuário, faz uma solicitação ao servidor para excluir o usuário e, em caso de sucesso, chama excluirUsuario.

    //Obter o ID do usuário:
    //Obtém o id_usuario do alvo atual do evento (currentTarget), que é o botão que foi clicado.
    let id_usuario = evt.currentTarget.id_usuario;

    //Confirmar a exclusão:
    /*
    Exibe uma mensagem de confirmação para o usuário.

    Se o usuário confirmar a exclusão, a variável excluir será true.
    */
    let excluir = confirm("Você tem certeza que deseja excluir este usuário?");

    //Requisição para excluir o usuário:
    /*
    Se a exclusão for confirmada, a função faz uma solicitação GET para excluir.php com o id_usuario como parâmetro.

    Quando a resposta do servidor é recebida, ela é convertida para JSON.

    A função excluirUsuario é chamada com o retorno da solicitação e o id_usuario.

    Se houver um erro durante a solicitação, ele é registrado no console.
    */
    if (excluir == true) {
        fetch('excluir.php?id_usuario=' + id_usuario,
            {
                method: "GET",
                headers: { 'Content-Type': "application/json; charset=UTF-8" }
            }
        )
            .then(response => response.json())
            .then(retorno => excluirUsuario(retorno, id_usuario))
            .catch(error => console.log(error));
    }
}

//Esta função é chamada para remover o usuário da tabela no HTML, após receber a confirmação de exclusão do servidor.
function excluirUsuario(retorno, id_usuario) {

    //Função excluirUsuario(retorno, id_usuario): Remove a linha correspondente ao usuário da tabela no HTML se a exclusão for confirmada pelo servidor.

    //Verificar o retorno da solicitação:
    //Verifica se a resposta do servidor indica que a exclusão foi bem-sucedida (ou seja, retorno é true).
    if (retorno == true) {

        //Remover a linha do usuário da tabela:
        /* 
        Obtém o elemento <tbody> da tabela com o ID usuarios.

        Itera sobre cada linha (<tr>) da tabela.

        Se o primeiro <td> da linha contém o id_usuario correspondente, a linha é removida da tabela.
        */
        let tbody = document.getElementById('usuarios');
        for (const tr of tbody.children) {
            if (tr.children[0].innerHTML == id_usuario) {
                tbody.removeChild(tr);
            }
        }
    }
}

//Esta função é responsável por atualizar as informações de um usuário na tabela HTML.
function alterarUsuario(usuario) {

    //Função alterarUsuario(usuario): Atualiza as informações de um usuário na tabela HTML, iterando sobre as linhas da tabela para encontrar a linha correspondente ao id_usuario e modificando os valores das células de nome e email.

    //Obter o elemento <tbody> da tabela:
    //Obtém a referência ao elemento <tbody> da tabela com o ID usuarios.
    let tbody = document.getElementById('usuarios');

    //Iterar sobre as linhas da tabela (<tr>):
    /*
    Usa um loop for...of para iterar sobre cada linha (<tr>) da tabela.

    Verifica se o conteúdo da primeira célula (<td>) da linha é igual ao id_usuario do objeto usuario passado como parâmetro.

    Se encontrar a linha correspondente, atualiza o conteúdo das células de nome e email com os novos valores fornecidos pelo objeto usuario.
    */
    for (const tr of tbody.children) {
        if (tr.children[0].innerHTML == usuario.id_usuario) {
            tr.children[1].innerHTML = usuario.nome;
            tr.children[2].innerHTML = usuario.email;
        }
    }
}

//Esta função é chamada quando um evento de clique é disparado em um botão de busca de usuário. Ela faz uma solicitação para buscar os dados de um usuário específico e preenche um formulário com esses dados.
function buscaUsuario(evt) {

    //Função buscaUsuario(evt): Faz uma solicitação para buscar os dados de um usuário específico e preenche um formulário com esses dados ao receber a resposta do servidor.

    //Obter o ID do usuário:
    //Obtém o id_usuario do alvo atual do evento (currentTarget), que é o botão que foi clicado.
    let id_usuario = evt.currentTarget.id_usuario;

    //Fazer uma solicitação para buscar os dados do usuário:
    /*
    Faz uma solicitação GET para buscaUsuario.php com o id_usuario como parâmetro.

    Quando a resposta do servidor é recebida, ela é convertida para JSON.

    A função preencheForm é chamada com o objeto usuario retornado, preenchendo um formulário com os dados do usuário.

    Se houver um erro durante a solicitação, ele é registrado no console.
    */
    fetch('buscaUsuario.php?id_usuario=' + id_usuario,
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(usuario => preencheForm(usuario))
        .catch(error => console.log(error));
}

//Esta função preenche os campos de um formulário HTML com as informações de um usuário específico.
function preencheForm(usuario) {

    //Função preencheForm(usuario): Preenche os campos de um formulário HTML com os dados do usuário.

    //Obter o campo do ID do usuário:
    //Obtém o primeiro elemento do formulário com o nome id_usuario e define seu valor como o id_usuario do objeto usuario.
    let inputIDUsuario = document.getElementsByName("id_usuario")[0];
    inputIDUsuario.value = usuario.id_usuario;

    //Obter o campo do nome do usuário:
    //Obtém o primeiro elemento do formulário com o nome nome e define seu valor como o nome do objeto usuario.
    let inputNome = document.getElementsByName("nome")[0];
    inputNome.value = usuario.nome;

    //Obter o campo do email do usuário:
    //Obtém o primeiro elemento do formulário com o nome email e define seu valor como o email do objeto usuario.
    let inputEmail = document.getElementsByName("email")[0];
    inputEmail.value = usuario.email;

    //Obter o campo da senha do usuário:
    //Obtém o primeiro elemento do formulário com o nome senha e define seu valor como o senha do objeto usuario.
    let inputSenha = document.getElementsByName("senha")[0];
    inputSenha.value = usuario.senha;
}

//Esta função salva ou atualiza as informações do usuário, dependendo se um ID de usuário está presente ou não. Também impede o envio do formulário HTML padrão.
function salvarUsuario(event) {

    //Função salvarUsuario(event): Gerencia o salvamento ou atualização de um usuário, verificando se um ID de usuário já está presente e chamando as funções apropriadas (cadastrar ou alterar), e previne o comportamento padrão do formulário.

    //Prevenir o envio do formulário:
    //Impede que o formulário seja enviado da maneira padrão ao clicar no botão de envio.
    event.preventDefault();

    //Obter e definir valores dos campos do formulário:
    //Obtém os valores dos campos id_usuario, nome, email e senha do formulário.
    let inputIDUsuario = document.getElementsByName("id_usuario")[0];
    let id_usuario = inputIDUsuario.value;
    let inputNome = document.getElementsByName("nome")[0];
    let nome = inputNome.value;
    let inputEmail = document.getElementsByName("email")[0];
    let email = inputEmail.value;
    let inputSenha = document.getElementsByName("senha")[0];
    let senha = inputSenha.value;

    //Verificar se o usuário já existe:
    if (id_usuario == "") {

        //Se id_usuario estiver vazio, chama a função cadastrar para criar um novo usuário.
        cadastrar(id_usuario, nome, email, senha);

    } else {

        //Se id_usuario não estiver vazio, chama a função alterar para atualizar o usuário existente.
        alterar(id_usuario, nome, email, senha);
    }
    //Resetar o formulário:
    //Reseta o formulário após o envio ou atualização dos dados do usuário.
    document.getElementsByTagName('form')[0].reset();
}

//Esta função é responsável por enviar uma requisição para cadastrar um novo usuário.
function cadastrar(id_usuario, nome, email, senha) {

    //Função cadastrar: Envia uma requisição POST para inserir.php para cadastrar um novo usuário, e após receber a resposta, chama a função inserirUsuario para inserir o novo usuário na interface.

    //Fazer a requisição de cadastro:
    /*
    Faz uma requisição POST para inserir.php.

    Envia o corpo da requisição em formato JSON, contendo os parâmetros id_usuario, nome, email e senha.

    Define o cabeçalho Content-Type como application/json; charset=UTF-8.
    */
    fetch('inserir.php',
        {
            method: 'POST',
            body: JSON.stringify({

                //parametro: valor
                id_usuario: id_usuario,
                nome: nome,
                email: email,
                senha: senha
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
    //Processar a resposta da requisição:
    /*
    Quando a resposta do servidor é recebida, ela é convertida para JSON.

    A função inserirUsuario é chamada com o objeto usuario retornado, para inserir o novo usuário na interface.

    Se houver algum erro durante a requisição, ele é registrado no console.    
    */
        .then(response => response.json())
        .then(usuario => inserirUsuario(usuario))
        .catch(error => console.log(error));
}

//Esta função é responsável por enviar uma requisição para alterar os dados de um usuário existente.
function alterar(id_usuario, nome, email, senha) {

    //Função alterar: Envia uma requisição POST para alterar.php para alterar os dados de um usuário existente, e após receber a resposta, chama a função alterarUsuario para atualizar o usuário na interface.

    //Fazer a requisição de alteração:
    /*
    Faz uma requisição POST para alterar.php.

    Envia o corpo da requisição em formato JSON, contendo os parâmetros id_usuario, nome, email e senha.

    Define o cabeçalho Content-Type como application/json; charset=UTF-8.
    */
    fetch('alterar.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id_usuario: id_usuario,
                nome: nome,
                email: email,
                senha: senha
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
    //Processar a resposta da requisição:
    /*
    Quando a resposta do servidor é recebida, ela é convertida para JSON.

    A função alterarUsuario é chamada com o objeto usuario retornado, para atualizar o usuário na interface.

    Se houver algum erro durante a requisição, ele é registrado no console.
    */
        .then(response => response.json())
        .then(usuario => alterarUsuario(usuario))
        .catch(error => console.log(error));
}