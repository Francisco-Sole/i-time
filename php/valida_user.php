<?php
require_once 'dbConnect.php';
$nombre = $_POST["user"];
$pass = $_POST["passwd"];

$consulta="
SELECT u.id, u.nombreCompleto
	FROM empleados u 
WHERE u.user = '$nombre' AND 
	u.password = '$pass'";

$result = mysqli_query($link,$consulta);
$r = [];
while ($pos = mysqli_fetch_object($result))
{
	array_push($r, $pos->id);
	array_push($r, $pos->nombreCompleto);
	
}
echo json_encode($r);