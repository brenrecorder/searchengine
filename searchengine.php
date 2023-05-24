<?php
	header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
	header('Content-Type: application/json');
$sqlNewTableURL = "CREATE TABLE Links (
id INTEGER PRIMARY KEY,
PageURL TEXT NOT NULL,
PageTitle TEXT,
PageDescription TEXT,
AmountClicks TEXT
)"; 
	
if (file_exists("urldb.db")) { //CREATE DATABASE
	$db = new SQLite3('urldb.db');
} else {
	$db = new SQLite3('urldb.db');
	$db->querySingle($sqlNewTableURL);

	
	//$db->exec("INSERT INTO CoinSecure(Address, Amount, AmountRGB) VALUES('TotalMarket', '0', 'XXXXXX')");	
	echo "Tables and file created..";
}

	if (!empty($_GET['action'])) { $action = $_GET['action']; } else { $action = ""; }
	if ($action == 'addpage') {
	if (!empty($_GET['url'])) { $url = $_GET['url']; } else { $url = ""; }
	if (!empty($_GET['title'])) { $title = $_GET['title']; } else { $title = ""; }
	if (!empty($_GET['desc'])) { $desc = $_GET['desc']; } else { $desc = ""; }
	$idexists = $db->querySingle("SELECT COUNT(id) AS count FROM Links WHERE PageURL=='".$url."'");
	if ($idexists < 1) {
	$db->exec("INSERT INTO Links(PageURL, PageTitle, PageDescription) VALUES('".$url."', '".$title."', '".$desc."')");
		$response = array("response"=>"added", "url"=>$url);	} else {
	$response = array("response"=>"failed", "url"=>$url);
		}			
	echo json_encode($response);
	}
	if ($action == 'pagesjson') {
		
	if (!empty($_GET['search'])) { $search = $_GET['search']; } else { $search = ""; }
		$query="SELECT PageURL,PageTitle,PageDescription FROM Links WHERE PageDescription LIKE '%".$search."%' OR PageTitle LIKE '%".$search."%' OR PageURL LIKE '%".$search."%' ORDER BY ID DESC";
		$result=$db->query($query);
		$arrlinks = array();
		while($row= $result->fetchArray()){
			
if (substr($row['PageURL'], 0, 7) != 'http://' && substr($row['PageURL'], 0, 8) != 'https://'){
$urlout = "http://".$row['PageURL'];
}else {
$urlout = $row['PageURL'];	
}

		array_push($arrlinks, array("title"=>$row['PageTitle'], "desc"=>$row['PageDescription'], "url"=>$urlout));
	}
	echo json_encode($arrlinks);
	}
	
	