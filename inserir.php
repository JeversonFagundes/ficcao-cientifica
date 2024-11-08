<?php

require_once "conexao.php";
$mysql = conectar();

$ficcao = json_decode(file_get_contents("php://input"));
$sql = "INSERT INTO ficcao_cientifica
        (tema, autor, descricao)
        VALUES 
        ('$ficcao->tema', 
        '$ficcao->autor', 
        '$ficcao->descricao')";

executarSQL($mysql, $sql);

$ficcao->id = mysqli_insert_id($mysql);
echo json_encode($ficcao);