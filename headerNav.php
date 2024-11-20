<?php
$paginaCorrente = basename($_SERVER['SCRIPT_NAME']);
//echo $pagina_corrente;
?>

<div class="navbar-fixed">
    <nav class="#ffffff white lighten-3">
        <div class="nav-wrapper container">
            <a href="#" data-target="mobile" class="sidenav-trigger"><i class="material-icons" style="color: black;">menu</i></a>
            <ul class="right hide-on-med-and-down">
                <li> <a class="black-text" <?php if ($paginaCorrente == 'index.php') {
                                                echo 'style="text-decoration: underline;"';
                                            } ?> href="index.php">Home</a></li>
                <li> <a class="black-text" <?php if ($paginaCorrente == 'telaInicial.php') {
                                                echo 'style="text-decoration: underline;"';
                                            } ?> href="telaInicial.php">Ficção cientifíca</a></li>
              
            </ul>
        </div>
    </nav>
</div>

<!-- Sidenav para Mobile -->
<ul id="mobile" class="sidenav">
    <li><a href="index.php"><i class="material-icons">home</i> Home</a></li>
    <li><a href="telaInicial.php">Ficção cientifíca</a></li>
    
</ul>