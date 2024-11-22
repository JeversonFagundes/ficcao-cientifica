
<?php

                                                                                                                                                                          require_once "conexao.php";
$conexao = conectar();

//A linha de código PHP no arquivo listar.php desempenha a função de buscar dados de uma tabela no banco de dados e retornar esses dados no formato JSON.

$sql = "SELECT * FROM ficcao_cientifica";
$resultado = executarSQL($conexao, $sql);

//Usa a função mysqli_fetch_all() para buscar todos os registros do resultado da consulta e armazená-los em um array associativo. Cada registro é um array associativo onde os nomes das colunas são as chaves.
$ficcoes = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

//$usuarios => $ficcoes

//Converte o array associativo $usuarios para o formato JSON e o imprime. Isso permite que o código JavaScript no lado do cliente receba os dados em um formato facilmente manipulável.
echo json_encode($ficcoes);

//No contexto das funções JavaScript que mencionamos anteriormente, esse arquivo PHP fornece os dados necessários para popular a tabela de usuários na página web. O JavaScript faz uma requisição GET para listar.php, que retorna os dados dos usuários em formato JSON. As funções JavaScript então usam esses dados para inserir as informações dos usuários na tabela HTML.