<?php
//<script type='text/javascript' src='http://maps.google.com/maps/api/js?sensor=false;key=AIzaSyDIFRxR08JSGSj75Qds1k2qyc20nfxcgw4'></script>
//<script type='text/javascript' src='http://code.jquery.com/jquery-2.1.3.min.js'></script>
echo "
<html>
<header>
<meta charset='utf-8'> 
<title>Тестовое задание</title>
<link rel='stylesheet' type='text/css' href='css/main.css'>
<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css' integrity='sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M' crossorigin='anonymous'>
<script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src='js/mymap.js'></script>
</header>
<body>
<div id='loader'><span class='spinner'></span></div>
<div class='row'>
<h1 class='display-1'>Тестовое задание с картой</h1>
<div class='col-sm-7' id='map'></div>
<div class='col-sm-3' id='listofuser'>
<div data-spy='scroll' class='scroll-tab' data-offset='0'>
<table class='table table-striped table-hover table-sm'>
  <thead class='thead-default'>
    <tr>
      <th>ИМЯ</th>
    </tr>
  </thead>
  <tbody id='tab'>
 <tr class='tabfield' id='checkall'><td><input type='checkbox' name='checkall' id='1' checked> Выбрать/снять всех </td></tr>
</tbody>
</div>
</div>
</div>
<script type='text/javascript' src='https://googlemaps.github.io/js-marker-clusterer/src/markerclusterer.js'></script>
<script src='http://maps.googleapis.com/maps/api/js?key=AIzaSyDIFRxR08JSGSj75Qds1k2qyc20nfxcgw4' type='text/javascript'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js' integrity='sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4' crossorigin='anonymous'></script>
<script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js' integrity='sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1' crossorigin='anonymous'></script>
</body>
"
?>