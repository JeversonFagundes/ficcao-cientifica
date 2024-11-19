<?php

//Obter o ID do usuário a ser excluído:
//Obtém o id_usuario da solicitação HTTP GET. Esse parâmetro é passado na URL quando a requisição é feita.
$id_usuario = $_GET['id_usuario'];

require_once "conexao.php";
$conexao = conectar();

//Essas linhas de código PHP no arquivo excluir.php são responsáveis por receber uma solicitação para excluir um registro específico na tabela ficcao_cientifica do banco de dados, baseado no id_usuario passado como parâmetro, e retornar o resultado dessa operação em formato JSON.

//Preparar a consulta SQL para excluir o registro:
//Define a consulta SQL para deletar o registro na tabela ficcao_cientifica onde o campo id_ficcao é igual ao valor de $id_usuario.
$sql = "DELETE FROM ficcao_cientifica WHERE id_ficcao = $id_usuario";

//Executar a consulta SQL:
//Chama a função executarSQL(), passando a conexão ao banco de dados e a consulta SQL. O resultado da execução da consulta é armazenado na variável $retorno.
$retorno = executarSQL($conexao, $sql);

//Retornar o resultado da exclusão:
//Converte o resultado da operação de exclusão ($retorno) para o formato JSON e o imprime. Isso permite que o JavaScript no lado do cliente receba a confirmação se a exclusão foi bem-sucedida ou não.
echo json_encode($retorno);

/*
Relação com as Funções Anteriores

No contexto das funções JavaScript anteriores, esse arquivo PHP é chamado quando a função excluir(evt) é executada. A função excluir faz uma requisição GET para excluir.php com o id_usuario do usuário a ser excluído. O PHP processa essa requisição, tenta excluir o usuário do banco de dados e retorna um JSON indicando se a exclusão foi bem-sucedida. Dependendo da resposta (true ou false), a função excluirUsuario no JavaScript atualiza a interface do usuário, removendo a linha correspondente da tabela.
*/