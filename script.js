
//usuarios => ficcoes

/*
Essa linha de código adiciona um evento que será acionado quando todo o conteúdo do DOM (Document Object Model) for carregado e analisado. A função associada a esse evento (listarTodos) será chamada imediatamente após o carregamento do DOM, garantindo que todos os elementos HTML estejam disponíveis para manipulação.
*/
document.addEventListener("DOMContentLoaded", () => {
    listarTodos();
});

//Esta função faz uma solicitação assíncrona para buscar dados do servidor e processá-los.
function listarTodos() {

    fetch("listar.php",

        {
            //Inicia uma solicitação HTTP para o arquivo listar.php usando o método GET.
            method: "GET",

            // Define o cabeçalho Content - Type como application / json; charset = UTF - 8, indicando que o servidor deve retornar dados no formato JSON.
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )

        /*Quando a resposta do servidor é recebida, essa linha converte a resposta em um ("objeto JSON"). A conversão é necessária para transformar os dados brutos em um formato que pode ser manipulado pelo JavaScript. */
        .then(response => response.json())

        /*
        Após a conversão para JSON, os dados (no caso, ficcoes) são passados como argumento para a função inserirFiccoes.

        inserirFiccoes é chamada para processar e inserir os dados dos usuários no local apropriado, possivelmente em uma tabela ou lista na página.
        */

        .then(ficcoes => inserirFiccoes(ficcoes))

        //Se houver algum erro durante a solicitação ou a conversão, ele é capturado e registrado no console, permitindo a depuração.
        .catch(error => console.log(error));
}

//Esta função é responsável por iterar sobre uma lista de ficções e chamar outra função (inserirFiccao) para inserir cada ficção individualmente na interface HTML.
function inserirFiccoes(ficcoes) {

    //inserirFiccoes: Itera sobre uma lista de ficções e chama inserirFiccao para cada ficção.

    /*
    for (const ficcao of ficcoes) {
        inserirFiccao(ficcao);
    }
    A função recebe um array ficcoes como parâmetro.

    Usa um loop for...of para iterar sobre cada objeto ficcao no array.

    Para cada ficcao, chama a função , inserirFiccao passando o ("objeto ficcao") como argumento.
    */
    for (const ficcao of ficcoes) {
        inserirFiccao(ficcao);
    }

}

//Esta função é responsável por criar e inserir elementos HTML correspondentes às informações de uma ficção dentro de uma tabela na página.
function inserirFiccao(ficcao) {

    //inserirFiccao: Cria e insere elementos HTML correspondentes a uma ficção específico na tabela.

    //Obter o elemento <tbody> da tabela.
    //Obtém a referência ao elemento <tbody> da tabela com o ID ficcoes.
    let tbody = document.getElementById('ficcoes');

    //Criar uma nova linha de tabela (<tr>):
    //Cria um novo elemento de linha (<tr>).
    let tr = document.createElement('tr');

    //Criar e preencher as células da linha (<td>):

    //Para o ID da ficção:
    let tdId = document.createElement('td');
    tdId.innerHTML = ficcao.id;

    //Para o tema da ficção cientifica:
    let tdTema = document.createElement('td');
    tdTema.innerHTML = ficcao.tema;

    //Para o autor da ficção cientifca:
    let tdAutor = document.createElement('td');
    tdAutor.innerHTML = ficcao.autor;

    //Para a descricção da ficção cientifica:
    let tdDescriccao = document.createElement('td');
    tdDescriccao.innerHTML = ficcao.descricao;

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
    btnAlterar.addEventListener("click", buscaFiccao, false);
    btnAlterar.id_ficcao = ficcao.id;
    tdAlterar.appendChild(btnAlterar);

    //Criar a célula e botão de "Excluir":

    //Similar ao botão de "Alterar", mas com texto "Excluir" e chamando a função excluir quando clicado.
    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.addEventListener("click", excluir, false);
    btnExcluir.id_ficcao = ficcao.id;
    btnExcluir.innerHTML = "Excluir";
    tdExcluir.appendChild(btnExcluir);

    //Adicionar as células à linha (<tr>):
    tr.appendChild(tdId);
    tr.appendChild(tdTema);
    tr.appendChild(tdAutor);
    tr.appendChild(tdDescriccao);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);

    //Adicionar a linha (<tr>) ao <tbody>:
    tbody.appendChild(tr);
}

//Esta função é chamada quando um evento de clique é disparado em um botão de exclusão.
function excluir(evt) {

    //Função excluir(evt): Garante que o usuário deseja realmente excluir uma ficção, faz uma solicitação ao servidor para excluir a ficção e, em caso de sucesso, chama excluirFiccao.

    //Obter o ID da ficção:
    //Obtém o id_ficcao do alvo atual do evento (currentTarget), que é o botão que foi clicado.
    let id_ficcao = evt.currentTarget.id_ficcao;

    //Confirmar a exclusão:
    /*
    Exibe uma mensagem de confirmação para o usuário.

    Se o usuário confirmar a exclusão, a variável excluir será true.
    */
    let excluir = confirm("Você tem certeza que deseja excluir essa ficção?");

    //Requisição para excluir a ficção:
    /*
    Se a exclusão for confirmada, a função faz uma solicitação GET para excluir.php com o id_ficcao como parâmetro.

    Quando a resposta do servidor é recebida, ela é convertida para JSON.

    A função excluirFiccao é chamada com o retorno da solicitação e o id_ficcao.

    Se houver um erro durante a solicitação, ele é registrado no console.
    */
    if (excluir == true) {
        fetch('excluir.php?id_ficcao=' + id_ficcao,
            {
                method: "GET",
                headers: { 'Content-Type': "application/json; charset=UTF-8" }
            }
        )
            .then(response => response.json())
            .then(retorno => excluirFiccao(retorno, id_ficcao))
            .catch(error => console.log(error));
    }
}

//Esta função é chamada para remover a ficção da tabela no HTML, após receber a confirmação de exclusão do servidor.
function excluirFiccao(retorno, id_ficcao) {

    //Função eexcluirFiccao(retorno, id_ficcao): Remove a linha correspondente a ficção da tabela no HTML se a exclusão for confirmada pelo servidor.

    //Verificar o retorno da solicitação:
    //Verifica se a resposta do servidor indica que a exclusão foi bem-sucedida (ou seja, retorno é true).
    if (retorno == true) {

        //Remover a linha da ficção da tabela:
        /* 
        Obtém o elemento <tbody> da tabela com o ID ficcoes.

        Itera sobre cada linha (<tr>) da tabela.

        Se o primeiro <td> da linha contém o id_ficcao correspondente, a linha é removida da tabela.
        */

        let tbody = document.getElementById('ficcoes');
        for (const tr of tbody.children) {
            if (tr.children[0].innerHTML == id_ficcao) {
                tbody.removeChild(tr);
            }
        }
    }
}

//Esta função é responsável por atualizar as informações de uma ficção na tabela HTML.
function alterarFiccao(ficcao) {

    //Função alterarFiccao(ficcao): Atualiza as informações de uma ficção na tabela HTML, iterando sobre as linhas da tabela para encontrar a linha correspondente ao id_ficcao e modificando os valores das células de autor, tema e descriçã.

    //Obter o elemento <tbody> da tabela:
    //Obtém a referência ao elemento <tbody> da tabela com o ID ficcoes.
    let tbody = document.getElementById('ficcoes');

    //Iterar sobre as linhas da tabela (<tr>):
    /*
    Usa um loop for...of para iterar sobre cada linha (<tr>) da tabela.

    Verifica se o conteúdo da primeira célula (<td>) da linha é igual ao id_ficcao do objeto ficcao passado como parâmetro.

    Se encontrar a linha correspondente, atualiza o conteúdo das células de autor, tema e descrição com os novos valores fornecidos pelo objeto ficcao.
    */
    for (const tr of tbody.children) {
        if (tr.children[0].innerHTML == ficcao.id_ficcao) {
            tr.children[1].innerHTML = ficcao.tema;
            tr.children[2].innerHTML = ficcao.autor;
            tr.children[3].innerHTML = ficcao.descricao;
        }
    }
}

//Esta função é chamada quando um evento de clique é disparado em um botão de busca de ficção. Ela faz uma solicitação para buscar os dados de uma ficção específica e preenche um formulário com esses dados.
function buscaFiccao(evt) {

    //Função buscaFiccao(evt): Faz uma solicitação para buscar os dados de uma ficção específica e preenche um formulário com esses dados ao receber a resposta do servidor.

    //Obter o ID da ficção:
    //Obtém o id_ficcao do alvo atual do evento (currentTarget), que é o botão que foi clicado.
    let id_ficcao = evt.currentTarget.id_ficcao;

    //Fazer uma solicitação para buscar os dados da ficção:
    /*
    Faz uma solicitação GET para buscaFiccao.php com o id_ficcao como parâmetro.

    Quando a resposta do servidor é recebida, ela é convertida para JSON.

    A função preencheForm é chamada com o ("objeto ficcao") retornado, preenchendo um formulário com os dados da ficcao.

    Se houver um erro durante a solicitação, ele é registrado no console.
    */
    fetch('buscaFiccao.php?id_ficcao=' + id_ficcao,
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(ficcao => preencheForm(ficcao))
        .catch(error => console.log(error));
}

//Esta função preenche os campos de um formulário HTML com as informações de uma ficção específica.
function preencheForm(ficcao) {

    //Função preencheForm(ficcao): Preenche os campos de um formulário HTML com os dados da ficção.

    //Obter o campo do ID da ficção:
    //Obtém o primeiro elemento do formulário com o nome id_ficcao e define seu valor como o id do ("objeto ficcao").
    let inputIDFiccao = document.getElementsByName("id_ficcao")[0];
    inputIDFiccao.value = ficcao.id;

    //Obter o campo do tema da ficção:
    //Obtém o primeiro elemento do formulário com o nome tema e define seu valor como o tema do ("objeto ficção").
    let inputTema = document.getElementsByName("tema")[0];
    inputTema.value = ficcao.tema;

    //Obter o campo do autor da ficção:
    //Obtém o primeiro elemento do formulário com o nome autor e define seu valor como o autor do ("objeto ficção").
    let inputAutor = document.getElementsByName("autor")[0];
    inputAutor.value = ficcao.autor;

    //Obter o campo da descrição da ficção:
    //Obtém o primeiro elemento do formulário com o nome descricao e define seu valor como o descricao do ("objeto ficção").
    let inputDescricao = document.getElementsByName("descricao")[0];
    inputDescricao.value = ficcao.descricao;
}

//Esta função salva ou atualiza as informações da ficção, dependendo se um ID da ficção está presente ou não. Também impede o envio do formulário HTML padrão.
function salvarFiccao(event) {

    //Função salvarFiccao(event): Gerencia o salvamento ou atualização de uma ficção, verificando se um ID da ficção já está presente e chamando as funções apropriadas (cadastrar ou alterar), e previne o comportamento padrão do formulário.

    //Prevenir o envio do formulário:
    //Impede que o formulário seja enviado da maneira padrão ao clicar no botão de envio.
    event.preventDefault();

    //Obter e definir valores dos campos do formulário:
    //Obtém os valores dos campos id_ficcao, tema, autor e descricao do formulário.
    let inputIDFiccao = document.getElementsByName("id_ficcao")[0];
    let id_ficcao = inputIDFiccao.value;
    let inputTema = document.getElementsByName("tema")[0];
    let tema = inputTema.value;
    let inputAutor = document.getElementsByName("autor")[0];
    let autor = inputAutor.value;
    let inputDescricao = document.getElementsByName("descricao")[0];
    let descricao = inputDescricao.value;

    //Verificar se a ficção já existe:
    if (id_ficcao == "") {

        //Se id_ficcao estiver vazio, chama a função cadastrar para criar uma nova ficção.
        cadastrar(id_ficcao, tema, autor, descricao);

    } else {

        //Se id_ficcao não estiver vazio, chama a função alterar para atualizar a ficção existente.
        alterar(id_ficcao, tema, autor, descricao);
    }
    //Resetar o formulário:
    //Reseta o formulário após o envio ou atualização dos dados da ficção.
    document.getElementsByTagName('form')[0].reset();
}

//Esta função é responsável por enviar uma requisição para cadastrar uma nova ficção.
function cadastrar(id_ficcao, tema, autor, descricao) {

    //Função cadastrar: Envia uma requisição POST para inserir.php para cadastrar uma nova ficção, e após receber a resposta, chama a função inserirFiccao para inserir a nova ficção na interface.

    //Fazer a requisição de cadastro:
    /*
    Faz uma requisição POST para inserir.php.

    Envia o corpo da requisição em formato JSON, contendo os parâmetros id_ficcao, tema, autor e descricao.

    Define o cabeçalho Content-Type como application/json; charset=UTF-8.
    */
    fetch('inserir.php',
        {
            method: 'POST',
            body: JSON.stringify({

                //parametro: valor
                id_ficcao: id_ficcao,
                tema: tema,
                autor: autor,
                descricao: descricao
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
    //Processar a resposta da requisição:
    /*
    Quando a resposta do servidor é recebida, ela é convertida para JSON.

    A função inserirFiccao é chamada com o ("objeto ficcao") retornado, para inserir a nova ficção na interface.

    Se houver algum erro durante a requisição, ele é registrado no console.    
    */
        .then(response => response.json())
        .then(ficcao => inserirFiccao(ficcao))
        .catch(error => console.log(error));
}

//Esta função é responsável por enviar uma requisição para alterar os dados de uma ficção existente.
function alterar(id_ficcao, tema, autor, descricao) {

    //Função alterar: Envia uma requisição POST para alterar.php para alterar os dados de uma ficção existente, e após receber a resposta, chama a função alterarFiccao para atualizar a ficção na interface.

    //Fazer a requisição de alteração:
    /*
    Faz uma requisição POST para alterar.php.

    Envia o corpo da requisição em formato JSON, contendo os parâmetros id_ficcao, tema, autor e descricao.

    Define o cabeçalho Content-Type como application/json; charset=UTF-8.
    */
    fetch('alterar.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id_ficcao: id_ficcao,
                tema: tema,
                autor: autor,
                descricao: descricao
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
    //Processar a resposta da requisição:
    /*
    Quando a resposta do servidor é recebida, ela é convertida para JSON.

    A função alterarFiccao é chamada com o ("objeto ficcao") retornado, para atualizar a ficcção na interface.

    Se houver algum erro durante a requisição, ele é registrado no console.
    */
        .then(response => response.json())
        .then(ficcao => alterarFiccao(ficcao))
        .catch(error => console.log(error));
}