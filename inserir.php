<?php

require_once "conexao.php";
$conexao = conectar();

//Estas linhas de código PHP no arquivo inserir.php têm a função de receber dados de um novo usuário via uma requisição HTTP POST, inserir esses dados na tabela ficcao_cientifica no banco de dados e retornar o usuário com o ID gerado. Vamos detalhar cada etapa:

//Receber e decodificar os dados do usuário:
//Recebe os dados enviados na requisição HTTP POST e os decodifica de JSON para um objeto PHP. Esses dados são lidos a partir do fluxo de entrada (php://input).
$usuario = json_decode(file_get_contents("php://input"));

//Preparar a consulta SQL:
//Define a consulta SQL para inserir um novo registro na tabela ficcao_cientifica com os valores fornecidos nos campos nome, email e senha do objeto $usuario.
$sql = "INSERT INTO ficcao_cientifica
        (autor, tema, descricao)
        VALUES 
        ('$usuario->nome', 
        '$usuario->email', 
        '$usuario->senha')";

executarSQL($conexao, $sql);

//Obter o ID do novo usuário inserido:
//Após a inserção, usa a função mysqli_insert_id() para obter o ID gerado automaticamente para o novo registro e o atribui ao objeto $usuario.
$usuario->id_usuario = mysqli_insert_id($conexao);

//Retornar o usuário inserido em formato JSON:
//Converte o objeto $usuario, agora incluindo o id_usuario, de volta para o formato JSON e o imprime. Isso permite que o JavaScript no lado do cliente receba a resposta contendo os dados do novo usuário.
echo json_encode($usuario);

/*
Relação com as Funções Anteriores

Esse arquivo PHP trabalha em conjunto com as funções JavaScript cadastrar e inserirUsuario. Quando um novo usuário é cadastrado via a função JavaScript, essa requisição é enviada para inserir.php, que processa os dados, insere o novo usuário no banco de dados e retorna os dados do usuário com o ID gerado. A função inserirUsuario então usa esses dados para inserir o novo usuário na interface HTML.

*/