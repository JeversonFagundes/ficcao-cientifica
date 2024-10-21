<?php

/**
 * Faz uma conexão com o banco de dados MySQL, 
 * na base de dados ficcao_cientifica.
 * 
 * @return \mysqli retorna uma conexão com a base de dados, ou em caso 
 * de falha, mata a execução e exibe o erro.
 */
function conectar()
{
    $mysql = mysqli_connect(
        "localhost",
        "root",
        "",
        "ficcao_cientifica"
    );
    if ($mysql === false) {
        echo "Erro ao conectar à base dados. Nº do erro: " .
            mysqli_connect_errno() . ". " .
            mysqli_connect_error();
        die();
    }
    return $mysql;
}

function executarSQL($mysql, $sql)
{
    $resultado = mysqli_query($mysql, $sql);
    if ($resultado === false) {
        echo "Erro ao executar o comando SQL. " .
            mysqli_errno($mysql) . ": " . mysqli_error($mysql);
        die();
    }
    return $resultado;
}
