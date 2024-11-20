<?php

require_once "conexao.php";
$conexao = conectar();

//Essas linhas de código no arquivo alterar.php têm a finalidade de receber dados de uma ficção via uma requisição HTTP POST, atualizar os dados da ficção correspondente na tabela ficcao_cientifica no banco de dados e retornar os dados atualizados.

//Receber e decodificar os dados da ficção:
//Recebe os dados enviados na requisição HTTP POST e os decodifica de JSON para um objeto PHP. Esses dados são lidos a partir do fluxo de entrada (php://input).
$ficcao = json_decode(file_get_contents("php://input"));

//Preparar a consulta SQL para atualizar os dados:
//Define a consulta SQL para atualizar os campos autor, tema e descricao na tabela ficcao_cientifica com os valores fornecidos no objeto $ficcao, onde o campo id_ficcao é igual ao valor de $ficcao->id.
$sql = "UPDATE ficcao_cientifica SET
        autor = '$ficcao->autor', 
        tema = '$ficcao->tema', 
        descricao = '$ficcao->descricao'
        WHERE id = $ficcao->id_ficcao";

//Executar a consulta SQL:
//Chama a função executarSQL(), passando a conexão ao banco de dados e a consulta SQL. Essa linha executa a consulta para atualizar os dados do usuário no banco de dados.
executarSQL($conexao, $sql);

//Retornar os dados atualizados da ficção:
//Converte o objeto $ficcaode volta para o formato JSON e o imprime. Isso permite que o JavaScript no lado do cliente receba os dados atualizados da ficção.
echo json_encode($ficcao);

/*
Relação com as Funções Anteriores

No contexto das funções JavaScript anteriores, esse arquivo PHP é chamado quando a função alterar é executada. A função alterar envia uma requisição POST para alterar.php com os dados atualizados da ficção. O PHP processa essa requisição, atualiza os dados da ficção no banco de dados e retorna um JSON contendo os dados atualizados. A função alterarFiccao no JavaScript então usa esses dados para atualizar a interface do usuário, modificando as informações correspondentes na tabela HTML.
*/