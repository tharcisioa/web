<html>
<head></head>
<body>
    <form method=”GET” action=”pesquisa.php”>
    <p><label for=”txtPesquisa”>Pesquisa: <input type=”text” id=”txtPesquisa” name=”txtPesquisa” /></p>
    <input type=”submit” value=”Pesquisar” />
    </form>
</body>
</html>

<?php
$search = explode(' ', $_GET['txtPesquisa']);

$mongo = new MongoDB\Driver\Manager('mongodb://localhost:27017/site-auth');
$filter = ['tags' => ['$all' => $search ] ];
$query = new MongoDB\Driver\Query($filter, ['sort' => [ 'nome' => 1], 'limit' => 5]);
$rows = $mongo->executeQuery("luiztools.customers", $query);

foreach ($rows as $row) {
     echo "$row->nome : $row->profissao\n";
}
?>