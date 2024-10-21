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
    <title>CRUD FICÃO CIENTIFICA</title>
</head>

<body>

    <h1>CRUD FICÇÃO CIENTIFICA</h1>
    <form onsubmit="return salvarUsuario(event);">
        <label>ID: <input type="number" name="id_usuario"></label><br>
        <label>Nome: <input type="text" name="nome"></label><br>
        <label>Email: <input type="email" name="email"></label><br>
        <label>Senha: <input type="password" name="senha"></label><br>
        <input type="submit" value="Salvar ficção">
    </form>
    <br>

    <?php

    $sql = "SELECT * FROM ficcao_cientifica";
    $query = executarSQL($mysql, $sql);
    $quantidade = $query->num_rows;

    if ($quantidade > 0) {

    ?>

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
    <?php
    } else {
    }
    ?>

    <script src="js/bootstrap.min.js"></script>
    <script src="script.js"></script>
</body>

</html>