<?php

require_once "conexao.php";
$mysql = conectar();

$ficcao_cientifica = json_decode(file_get_contents("php://input"));
$sql = "INSERT INTO ficcao_cientifica
        (tema_ficcao_cientifica, autor_ficcao_cientifica, descricao_ficcao_cientifica)
        VALUES 
        ('$ficcao_cientifica->nome', 
        '$ficcao_cientifica->email', 
        '$ficcao_cientifica->senha')";

executarSQL($mysql, $sql);

$ficcao_cientifica->id_ficcao_cientifica = mysqli_insert_id($mysql);
echo json_encode($ficcao_cientifica);