<?php
require_once "conexao.php";
$mysql = conectar();
?>
<!DOCTYPE html>
<html lang="pt_BR">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD FICCAO CIENTIFICA</title>
</head>

<body>
    <h1>CRUD FICÇÃO CIENTIFICA</h1>
    <form onsubmit="return salvarFiccao(event);">
        <label for="tema">Tema da ficção cientifica:</label>
        <input type="text" name="tema" id="tema"><br>
        <label for="autor">Autor da ficção cientifica:</label>
        <input type="text" name="autor" id="autor"><br>
        <label for="descricao">Descrição da ficção cientifica:</label><br>
        <textarea name="descricao" id="descricao"></textarea>
        <input type="submit" value="Salvar ficção">
    </form>
    <br>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Tema</th>
                <th>Autor</th>
                <th>Descrição</th>
                <th colspan="2">Opções</th>
            </tr>
        </thead>
        <tbody id="ficcao"></tbody>
    </table>
    <script src="js/bootstrap.min.js"></script>
    <script src="script.js"></script>
</body>

</html>