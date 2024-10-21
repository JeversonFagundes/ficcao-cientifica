<?php

$id_usuario = $_GET['id_usuario'];

require_once "conexao.php";

$conexao = conectar();
$sql = "DELETE FROM usuarios WHERE id_usuario = $id_usuario";
executarSQL($conexao, $sql);
