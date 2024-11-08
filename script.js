document.addEventListener("DOMContentLoaded", () => {
    listarTodos();
});

function listarTodos() {
    fetch("listar.php",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json; charset=UTF-8"
            }
        }
    )
        .then(response => response.json())
        .then(ficcoes => inserirFiccoes(ficcoes))
        .catch(error => console.log(error));
}

function inserirFiccoes(ficcoes) {
    for (const ficcao of ficcoes) {
        inserirFiccao(ficcao);
    }
}

function inserirFiccao(ficcao) {

    let tbody = document.getElementById('ficcoes');
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    tdId.innerHTML = ficcao.id;
    let tdTema = document.createElement('td');
    tdTema.innerHTML = ficcao.tema;
    let tdAutor = document.createElement('td');
    tdAutor.innerHTML = ficcao.autor;
    let tdDescricao = document.createElement('td');
    tdDescricao.innerHTML = ficcao.descricao;

    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.addEventListener("click", buscaficcao, false);
    btnAlterar.id = ficcao.id;
    btnAlterar.appendChild(btnAlterar);

    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.id = ficcao.id;
    btnExcluir.innerHTML = "Excluir";
    tdExcluir.appendChild(btnExcluir);

    tr.appendChild(tdId);
    tr.appendChild(tdTema);
    tr.appendChild(tdAutor);
    tr.appendChild(tdDescricao);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);
    tbody.appendChild(tr);
}

function excluir(evt) {

    let id = evt.currentTarget.id;
    let excluir = confirm("Você tem certeza que deseja excluir essa ficção cientifica");
    if (excluir == true) {
        fetch('excluir.php?id' + id,
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json; charset=UTF-8"
                }
            }
        )
            .then(response => response.json())
            .then(ficcao => preencheForm(ficcao))
            .catch(error => console.log(error));
    }
}

function alterarficcao(ficcao) {

    let tbody = document.getElementById('ficcoes');
    for (const tr of tbody.children) {

        if (tr.children[0].innerHTML == ficcao.id) {

            tr.children[1].innerHTML = ficcao.tema;
            tr.children[2].innerHTML = ficcao.autor;
            tr.children[3].innerHTML = ficcao.descricao;
        }
    }
}

function buscaficcao(evt) {

    let id = evt.currentTarget.id;
    fetch('busca.php?id' + id,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json; charset=UTF-8"
            }
        }
    )
        .then(response => response.json())
        .then(ficcao => preencheForm(ficcao))
        .catch(error => console.log(error));
}

function preencheForm(ficcao) {

    let inputId = document.getElementsByName("id")[0];
    inputId.value = ficcao.id;
    let inputTema = document.getElementsByName("tema")[0];
    inputTema.value = ficcao.tema;
    let inputAutor = document.getElementsByName("autor")[0];
    inputAutor.value = ficcao.autor;
    let inputDescricao = document.getElementsByName("descricao")[0];
    inputDescricao.value = ficcao.descricao;
}

function salvarficcao(event) {

    event.preventDefault();
    let inputId = document.getElementsByName("id")[0];
    let id = inputId.value;
    let inputTema = document.getElementsByName("tema")[0];
    let tema = inputTema.value;
    let inputAutor = document.getElementsByName("autor")[0];
    let autor = inputAutor.value;
    let inputDescricao = document.getElementsByName("descricao")[0];
    let descricao = inputDescricao.value;

    if (id == "") {
        cadastrar(id, tema, autor, descricao);
    } else {
        alterar(id, tema, autor, descricao);
    }
    document.getElementsByTagName('form')[0].reset();
}

function cadastrar(id, tema, autor, descricao) {

    fetch('inserir.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                tema: tema,
                autor: autor,
                descricao: descricao
            }),
            headers: {
                'Content-Type': "application/json; charset=UTF-8"
            }
        }
    )
        .then(response => response.json())
        .then(ficcao => inserirFiccao(ficcao))
        .catch(error => console.log(error));
}

function alterarficcao(id, tema, autor, descricao) {

    fetch('alterar.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                tema: tema,
                autor: autor,
                descricao: descricao
            }),
            headers: {
                'Content-Type': "application/json; charset=UTF-8"
            }
        }
    )
        .then(response => response.json())
        .then(ficcao => alterarficcao(ficcao))
        .catch(error => console.log(error));
}