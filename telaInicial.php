<!DOCTYPE html>
<html lang="pt_BR">

<head>
    <meta charset="UTF-8">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD JS</title>
</head>

<body>

    <?php

    require_once "headerNav.php";

    ?>

    <!--O arquivo index.html descrito implementa uma interface simples para um CRUD (Create, Read, Update, Delete) de usuários utilizando JavaScript para interagir com o back-end e manipular a interface do usuário.-->

    <!--
    Relação com as Funções Anteriores

    Formulário de Entrada de Usuário:

    Quando o usuário preenche o formulário e clica no botão "Salvar Usuário", a função salvarUsuario(event) é chamada. Esta função evita o envio padrão do formulário, coleta os dados do formulário e decide se deve chamar a função cadastrar (para criar um novo usuário) ou alterar (para atualizar um usuário existente).
    -->

    <!--Formulário de Entrada de Usuário:-->
    <form onsubmit="return salvarUsuario(event);">

        <!--
        Contém um formulário HTML que captura os dados do usuário (ID, Nome, Email, Senha).

        Atribui um evento onsubmit ao formulário para chamar a função JavaScript salvarUsuario(event) quando o formulário é enviado.
        -->
        <label>ID: <input type="number" name="id_usuario"></label><br>
        <label>Nome: <input type="text" name="nome"></label><br>
        <label>Email: <input type="text" name="email"></label><br>
        <label>Senha: <input type="text" name="senha"></label><br>
        <input type="submit" value="Salvar Usuário">
    </form>
    <br>

    <!--Tabela de Usuários:-->
    <table>

        <!--
        Tabela de Usuários:

        A função listarTodos() é chamada ao carregar a página para buscar todos os usuários do servidor e exibir seus dados na tabela.

        Funções como inserirUsuario(usuario), alterarUsuario(usuario) e excluirUsuario(retorno, id_usuario) são responsáveis por manipular as linhas da tabela dinamicamente, inserindo, atualizando ou removendo usuários conforme necessário.
        -->

        <!--
        Exibe os usuários em uma tabela HTML.

        A tabela contém um cabeçalho (<thead>) com colunas para ID, Nome, Email e Opções (para ações como alterar e excluir).

        O corpo da tabela (<tbody>) tem o ID usuarios, onde as linhas da tabela serão inseridas dinamicamente pelo JavaScript.
        -->
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th colspan="2">Opções</th>
            </tr>
        </thead>
        <tbody id="usuarios"></tbody>
    </table>

    <script src="script.js"></script>
    <!--Import jQuery before materialize.js-->
    <script type="text/javascript" src="js/materialize.min.js"></script>
</body>

</html>