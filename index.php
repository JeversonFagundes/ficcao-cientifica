<!DOCTYPE html>
<html lang="pt_BR">

<head>
    <meta charset="UTF-8">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD JS</title>
</head>

<body class="#f5f5f5 grey lighten-4">

    <?php
    require_once "headerNav.php";
    ?>

    <h1 class="center-align">O que é o gênero Ficção Científica?</h1>
    <main class="container">

        <div class="card-panel">

            <p>
                A ficção científica é um gênero literário e cinematográfico que explora temas baseados em avanços tecnológicos, científicos e futuros alternativos, frequentemente projetando cenários futurísticos ou distópicos. Esse gênero usa a imaginação para investigar questões filosóficas, sociais e éticas, envolvendo geralmente os seguintes elementos:
            </p>

            <p> <strong>Elementos Comuns da Ficção Científica:</strong></p>
            <p><strong>Tecnologia Avançada:</strong></p>
            <ul>
                <li>Robôs, inteligência artificial, viagens espaciais, teletransporte, entre outros.</li>
            </ul>

            <p><strong>Exploração do Espaço e Viagens no Tempo:</strong></p>
            <ul>
                <li> Histórias que se passam em outros planetas, galáxias distantes ou futuras eras da humanidade.</li>
            </ul>

            <p><strong> Cenários Futurísticos ou Alternativos:</strong></p>
            <ul>
                <li>
                    Mundos distópicos, utópicos ou civilizações alienígenas.
                </li>
            </ul>

            <p><strong>Temas Filosóficos e Éticos:</strong></p>
            <ul>
                <li>
                    Questões sobre a natureza da humanidade, ética do uso de tecnologia, evolução da sociedade, etc.
                </li>
            </ul>

            <p>
                <strong> Ciência e Experimentos:</strong>
            </p>
            <ul>
                <li>
                    Foco em descobertas científicas, experiências genéticas, ou teorias científicas como a relatividade e mecânica quântica.
                </li>
            </ul>
        </div>
    </main>

    <!--JavaScript at end of body for optimized loading-->
    <script type="text/javascript" src="js/materialize.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Inicializa a sidenav
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems, {
                edge: 'left'
            });

            // Configura a largura da sidenav
            var sidenav = document.querySelector('.sidenav');
            sidenav.style.width = '250px'; // Ajuste a largura conforme necessário
        });
    </script>

</body>

</html>