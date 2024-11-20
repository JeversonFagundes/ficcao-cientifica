<?php

//Obter o ID da ficção a ser excluída:
//Obtém o id_ficcao da solicitação HTTP GET. Esse parâmetro é passado na URL quando a requisição é feita.
$id_ficcao = $_GET['id_ficcao'];

require_once "conexao.php";
$conexao = conectar();

//Essas linhas de código PHP no arquivo excluir.php são responsáveis por receber uma solicitação para excluir um registro específico na tabela ficcao_cientifica do banco de dados, baseado no id_ficcao passado como parâmetro, e retornar o resultado dessa operação em formato JSON.

//Preparar a consulta SQL para excluir o registro:
//Define a consulta SQL para deletar o registro na tabela ficcao_cientifica onde o campo id_ficcao é igual ao valor de $id_ficcao.
$sql = "DELETE FROM ficcao_cientifica WHERE id = $id_ficcao";

//Executar a consulta SQL:
//Chama a função executarSQL(), passando a conexão ao banco de dados e a consulta SQL. O resultado da execução da consulta é armazenado na variável $retorno.
$retorno = executarSQL($conexao, $sql);

//Retornar o resultado da exclusão:
//Converte o resultado da operação de exclusão ($retorno) para o formato JSON e o imprime. Isso permite que o JavaScript no lado do cliente receba a confirmação se a exclusão foi bem-sucedida ou não.
echo json_encode($retorno);

/*
Relação com as Funções Anteriores

No contexto das funções JavaScript anteriores, esse arquivo PHP é chamado quando a função excluir(evt) é executada. A função excluir faz uma requisição GET para excluir.php com o id_ficcao da ficção a ser excluída. O PHP processa essa requisição, tenta excluir a ficção do banco de dados e retorna um JSON indicando se a exclusão foi bem-sucedida. Dependendo da resposta (true ou false), a função excluirFiccao no JavaScript atualiza a interface do usuário, removendo a linha correspondente da tabela.
*/