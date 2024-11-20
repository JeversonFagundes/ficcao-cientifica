<?php

require_once "conexao.php";
$conexao = conectar();

//Estas linhas de código PHP no arquivo inserir.php têm a função de receber dados de uma nova ficção via uma requisição HTTP POST, inserir esses dados na tabela ficcao_cientifica no banco de dados e retornar a ficção com o ID gerado. Vamos detalhar cada etapa:

//Receber e decodificar os dados da ficção:
//Recebe os dados enviados na requisição HTTP POST e os decodifica de JSON para um objeto PHP. Esses dados são lidos a partir do fluxo de entrada (php://input).
$ficcao = json_decode(file_get_contents("php://input"));

//Preparar a consulta SQL:
//Define a consulta SQL para inserir um novo registro na tabela ficcao_cientifica com os valores fornecidos nos campos tema, autor e descricao do objeto $ficcao.
$sql = "INSERT INTO ficcao_cientifica
        (autor, tema, descricao)
        VALUES 
        ('$ficcao->autor', 
        '$ficcao->tema', 
        '$ficcao->descricao')";

executarSQL($conexao, $sql);

//Obter o ID da nova ficção inserida:
//Após a inserção, usa a função mysqli_insert_id() para obter o ID gerado automaticamente para o novo registro e o atribui ao objeto $ficcao.
$ficcao->id = mysqli_insert_id($conexao);

//Retornar a ficção inserida em formato JSON:
//Converte o objeto $ficcao, agora incluindo o id, de volta para o formato JSON e o imprime. Isso permite que o JavaScript no lado do cliente receba a resposta contendo os dados da nova ficção.
echo json_encode($ficcao);

/*
Relação com as Funções Anteriores

Esse arquivo PHP trabalha em conjunto com as funções JavaScript cadastrar e inserirFiccao. Quando uma nova ficção é cadastrada via a função JavaScript, essa requisição é enviada para inserir.php, que processa os dados, insere  a nova ficção no banco de dados e retorna os dados da ficção com o ID gerado. A função inserirFiccao então usa esses dados para inserir a nova ficção na interface HTML.

*/