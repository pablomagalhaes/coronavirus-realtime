<?php 
	 header('Access-Control-Allow-Origin: *');
	$url = "https://covid19.mathdro.id/api/confirmed";
	$contenido= file_get_contents($url);
	$contenido = json_decode($contenido);
	$arr = [];
	foreach ($contenido as $c) {
		$info = new stdClass();
		$info->pais = $c->countryRegion;
		$info->confirmed = $c->confirmed;
		$info->recovered = $c->recovered;
		$info->deaths = $c->deaths;
		$info->iso = $c->iso2;
		array_push($arr, $info);
	}

	$listado = [];
	$insertado=false;

//var_dump($arr);
//die();
	for($c=0;$c<count($arr);$c++){
		$insertado=false;
		$info = new stdClass();
		$info->pais = $arr[$c]->pais;
		$info->confirmed = $arr[$c]->confirmed;
		$info->recovered = $arr[$c]->recovered;
		$info->deaths = $arr[$c]->deaths;
		$info->iso = $arr[$c]->iso;
		for($z=0;$z<count($listado);$z++){
			if($listado[$z]->pais==$info->pais){
				$listado[$z]->confirmed+=$info->confirmed;
				$listado[$z]->recovered+=$info->recovered;
				$listado[$z]->deaths+=$info->deaths;
				$insertado=true;
			}
		}
		if(!$insertado){
			array_push($listado, $info);
		}
	}
	$cantidadResultados=count($listado);
	$mayor = true;//mayor a menor
	$pagina = 1;
	$cantidad = $cantidadResultados;
	
	if(isset($_GET['mayor'])){
		if($_GET['mayor']=='true')
			$mayor=true;
		if($_GET['mayor']=='false')
			$mayor=false;
	}
	if(isset($_GET['cantidad'])){
		if(is_int((int)$_GET['cantidad'])){
			$cantidad = $_GET['cantidad']>=1?$_GET['cantidad']:1;
		}
	}
	if(isset($_GET['pagina'])){
		if(is_int((int)$_GET['pagina'])){
			$pagina = $_GET['pagina']>=1?$_GET['pagina']:1;
		}
	}

	if(!$mayor){
		$listado=array_reverse($listado);
	}

	$resultadoFinal = [];
	for($c=($cantidad*($pagina-1));$c<$cantidad*$pagina;$c++){
		if($listado[$c]->pais!=null){
			$info = new stdClass();
			$info->pais=$listado[$c]->pais;
			$info->confirmed=$listado[$c]->confirmed;
			$info->recovered=$listado[$c]->recovered;
			$info->deaths=$listado[$c]->deaths;
			$info->iso=$listado[$c]->iso;
			array_push($resultadoFinal, $info);
		}
		
	}
	$stdClass = new stdClass();
	$stdClass->data = $resultadoFinal;
	$stdClass->total = $cantidadResultados;
	echo json_encode($stdClass);

?>