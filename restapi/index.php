<?php
//header("Content-Type: application/json;charset=utf-8");
require("db_con.php");

function db_connect ($user, $pass, $db)
{

	$connection=mysql_connect ('localhost', $user, $pass);
	if (!$connection) { 
				die('Not connected : ' . mysql_error());
	}


	$db_selected = mysql_select_db($db, $connection);
	if (!$db_selected) {
  				die ('Can\'t use db : ' . mysql_error());
	}
	return $connection;
}


echo route();


function route() {

    // Обработка первоначальной загрузки всех координат
	if ($_GET['step']=='first') { return get_all_markers(); }
	
	
    // Загрузка координат в соответствии со списком выбраных имен
	if ($_GET['step']=='all')   {
    
	if (isset($_GET['names'])) { $partstr = make_SQL_Query_ByName($_GET['names']);
                                return get_all_markers($partstr);
                                } 
	                      else { return []; }
	
	}

	// Загрузка списка имен
	if ($_GET['step']=='getname') { return get_all_names(); }
	

	

}

// Формируем дополнительную строку к запросу для выборки по списку имен
function make_SQL_Query_ByName($names) 
{
	$i=0;	
	$Part_SQL = "WHERE SUBSTRING_INDEX(SUBSTRING_INDEX( d.fio , ' ', 2 ),' ',-1) IN"." (" . implode(',', $names) .")";
	return $Part_SQL;

}


// Формирование списка маркеров
function get_all_markers($Part_SQL = null) 
{
	global $username, $password, $database;
	if ($Part_SQL == null) $part = '';
					  else $part = $Part_SQL;			


	$link = db_connect ($username, $password, $database);
	$SQL = "SELECT latitude, longitude, d.fio, TRUNCATE ( ( 6371 * acos( cos( radians(55.7524113) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(37.6130966) ) + sin( radians(55.7524113) ) * sin( radians( latitude ) ) ) ), 2) AS distance FROM coordinates INNER JOIN person d ON d.id = person_id ".$part." ORDER BY distance ASC LIMIT 0 , 100";
	$data = array(); 
	$ta = mysql_query($SQL);
	while($row = mysql_fetch_assoc($ta)){ $data[] = $row; }
    mysql_close($link);

	return (json_encode($data)); 
}


// Формирование списка имен
function get_all_names()
{
	global $username, $password, $database;
	$link = db_connect ($username, $password, $database);
	$SQL = "SELECT COUNT(*) as count, SUBSTRING_INDEX(SUBSTRING_INDEX( fio , ' ', 2 ),' ',-1) AS NAME FROM `person` GROUP BY NAME ORDER BY NAME ASC LIMIT 0 , 100";
	$data = array(); 
	$ta = mysql_query($SQL);
	while($row = mysql_fetch_assoc($ta)){ $data[] = $row; }
	mysql_close($link);
	return (json_encode($data));

}


?>