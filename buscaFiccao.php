<?php

//Obter o ID da ficção:
//Obtém o id_ficcao da solicitação HTTP GET. Esse parâmetro é passado na URL quando a requisição é feita.
$id_ficcao = $_GET['id_ficcao'];

require_once "conexao.php";
$conexao = conectar();

//Essas linhas de código no arquivo buscaFiccao.php são responsáveis por receber uma solicitação para buscar os dados de uma ficção específica do banco de dados e retornar esses dados no formato JSON.

//Preparar a consulta SQL para buscar os dados:
//Define a consulta SQL para selecionar os campos id_ficcao, autor, tema e descricao da tabela ficcao_cientifica onde o campo id_ficcao é igual ao valor de $id_ficcao.
$sql = "SELECT id, autor, tema, descricao FROM ficcao_cientifica 
        WHERE id = $id_ficcao";

//Executar a consulta SQL:
//Chama a função executarSQL(), passando a conexão ao banco de dados e a consulta SQL. O resultado da execução da consulta é armazenado na variável $resultado.
$resultado = executarSQL($conexao, $sql);

//Buscar o resultado como um array associativo:
//Usa a função mysqli_fetch_assoc() para buscar o resultado da consulta como um array associativo. Esse array representa um único registro onde os nomes das colunas são as chaves.
$ficcao = mysqli_fetch_assoc($resultado);

//Retornar os dados da ficção em formato JSON:
//Converte o array associativo $ficcao para o formato JSON e o imprime. Isso permite que o JavaScript no lado do cliente receba os dados da ficção em um formato facilmente manipulável.
echo json_encode($ficcao);

/*
Relação com as Funções Anteriores

No contexto das funções JavaScript anteriores, esse arquivo PHP é chamado quando a função buscaFiccao(evt) é executada. A função faz uma requisição GET para buscaFiccao.php com o id_ficcao da ficção a ser buscada. O PHP processa essa requisição, busca os dados da ficção no banco de dados e retorna um JSON contendo esses dados. A função preencheForm no JavaScript então usa esses dados para preencher um formulário com as informações da ficção.
*/
