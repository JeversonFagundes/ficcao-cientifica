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
    <form onsubmit="return salvarUsuario(event);">
        <label for="tema">Tema da ficção cientifica:</label>
        <input type="submit" value="Salvar ficção">
    </form>
    <br>

    <table>
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

    <script src="js/bootstrap.min.js"></script>
    <script src="script.js"></script>
</body>

</html>