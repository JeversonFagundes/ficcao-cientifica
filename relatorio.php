<?php
require_once "conexao.php";
$conexao = conectar();

require 'dompdf/autoload.inc.php';

use Dompdf\Dompdf;
use Dompdf\Options;

// Configurar opções do DOMPDF
$options = new Options();

// Permite usar CSS e fontes externas
$options->set('isRemoteEnabled', true);
$dompdf = new Dompdf($options);

// HTML inicial
$dados = '
<html>
<head>
<link rel="StyleSheet" type="Text/css" href="estilo.css">
<style>
body
 { font-family: Arial, sans-serif; }
h1
{
	color:#a1887f;
}
table {
  border-collapse: collapse;
  width: 100%;
}
td,th {
  text-align: left;
  padding: 10px;
}
tr:nth-child(even)
	{background-color: #f2f2f2}
thead 
{
  background-color: #a1887f;
  color: white;
}
</style>
</head>
<body>
';

$dados .= "<h1 style='text-align: center;text-decoration: underline;'> Relatorio de Ficções Científicas </h1> ";

$dados .= "<table>
        <thead>
          <tr>
          <th>ID</th>
          <th>Autor</th>
          <th>Tema</th>
			    <th>Descrição</th>             
          </tr>
        </thead>
        <tbody>";

$sql = "SELECT id,autor,tema,descricao FROM ficcao_cientifica";
$resultado = mysqli_query($conexao, $sql);
while ($ficcao_cientifica = mysqli_fetch_assoc($resultado)) {
    $dados .= "<tr>";
    $dados .= '<td>' . $ficcao_cientifica['id'] . '</td>';
    $dados .= '<td>' . $ficcao_cientifica['autor'] . '</td>';
    $dados .= '<td>' . $ficcao_cientifica['tema'] . '</td>';
    $dados .= '<td>' . $ficcao_cientifica['descricao'] . '</td>';
    $dados .= "</tr>";
}
$dados .= "</tbody>";
$dados .= "</table>";
$dados .= "</body> </html>";


// Carrega o HTML no DOMPDF
$dompdf->loadHtml($dados);
// Define tamanho e orientação do papel
$dompdf->setPaper('A4', 'portrait');

// Renderizar o PDF
$dompdf->render();

// Enviar o PDF para o navegador
$dompdf->stream("relatorio.pdf", ["Attachment" => true]);
// Attachment false para exibir no navegador
