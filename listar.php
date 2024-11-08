<?php

require_once "conexao.php";
$conexao = conectar();

$sql = "SELECT * FROM ficcao_cientifica";
$resultado = executarSQL($conexao, $sql);
$ficcao_cientifica = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
echo json_encode($ficcao_cientifica);
