
var oMap = { 
      bounds: null, 
      map: null 
} 

var markers = [];


// Инициализация карты
oMap.init = function(selector, latLng, zoom) { 
  geocoder = new google.maps.Geocoder();
  var params = { 
    zoom:zoom, 
    center: latLng, 
    mapTypeId: google.maps.MapTypeId.ROADMAP 
  } 
  this.map = new google.maps.Map($(selector)[0], params); 
  this.bounds = new google.maps.LatLngBounds(); 
  oMap.placeMarkers('FIRST');  // Первоначальная загрузка всех маркеров
}


function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
        setMapOnAll(null);
}

function deleteMarkers() {
        clearMarkers();
        markers = [];
}



// Размещение маркеров на карте
oMap.placeMarkers = function(name_array) { 
   var timer;
   var mydata = {'step':'all'};
   if (name_array == undefined) {}  else { 
       if ((!$.isArray(name_array)) && (name_array == 'FIRST')) {mydata = {'step':'first'} };
       if ($.isArray(name_array)) $.extend(mydata, {'names':name_array}); 
      }

 $.ajax( { 
        type: 'GET', 
        dataType: 'json',
        url: 'http://test.agency911.org/restapi/index.php',
        data: mydata,

        beforeSend: function() { 
                timer = setTimeout(function() { $('#loader').show(); },300);
                },

        complete: function(){ 
                 $('#loader').hide(); 
                 clearTimeout(timer);
                },

        success: function(json_string) {    
     
       
        deleteMarkers();     // Удаление текущих маркетов
 
    $.each(json_string, function(key, val) {

      var name = val.fio; 
      var address = val.distance; 
      var point = new google.maps.LatLng(parseFloat(val.latitude),parseFloat(val.longitude)); 
      // расширим границы для включения нового маркера 
      oMap.bounds.extend(point); 
      // Добавление маркера на карту, выбор цвета
      if (val.distance<10) {var markercolor = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|008000';}
                     else  {var markercolor = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|CC0000';}                          
      
      var marker = new google.maps.Marker({ 
        position: point, 
        map: oMap.map,
        icon:markercolor
      }); 
      
      // Создание текстовой подсказки
      var infoWindow = new google.maps.InfoWindow(); 
      var html='<b>'+name+'</b><br />'+address; 
      
      // Добавление слушателя события для маркеров 
      google.maps.event.addListener(marker, 'click', function() { 
        infoWindow.setContent(html); 
        infoWindow.open(oMap.map, marker); 
      });
      
      markers.push(marker);
       } );

      // Создание кластеров
      markerClusterer = new MarkerClusterer(oMap.map, markers, {
          maxZoom: 6,
          gridSize: 15,
          imagePath: 'http://test.agency911.org/prod/img/m'
        });
 

    oMap.map.fitBounds(oMap.bounds); 
    clearTimeout(timer); // Сброс таймера предзагрузчика
    $('#loader').hide(); // Отключение предзагрузчика
}

} ); 
}




// Получение списка имен
GetUserList = function() { 
  var timer;
         $.ajax( { 
              type: 'GET', 
              dataType: 'json',
              url: 'http://test.agency911.org/restapi/index.php',
              data:{'step':'getname'},
              response:'json',

              beforeSend: function() { 
                timer = setTimeout(function() { $('#loader').show(); },300);
                  },

              complete: function() { 
                      $('#loader').hide(); 
                      clearTimeout(timer);
                    },

              success: function(json_string) {    
               $.each(json_string, function(key, val) {
                $('#tab').append( '<tr class="tabfield"><td>  <input type="checkbox" autocomplete="off" name="'+val.NAME+'"" value="'+val.NAME+'" checked>'+val.NAME+' <span class="badge badge-secondary">'+val.count+'</span></td></tr>');  
               });
               clearTimeout(timer); // Сброс таймера предзагрузчика
               $('#loader').hide(); // Отключение предзагрузчика
              }         
          } );
}



// Формирование списка выбранных имен
CheckInputs = function() { 
  var checked_array =[];
  $('#listofuser input:checkbox:checked').each(function(){
   if ($(this).val() != 'on') {checked_array.push("'"+$(this).val()+"'");}

});
   return checked_array;
}


$(document).ready(function(){

    
  var myLatLng = new google.maps.LatLng(55.7524113, 37.6130966); 

  GetUserList ();                   // Получение списка имен
  oMap.init('#map', myLatLng, 11);  // Инициализация карты


  // Обработка кликов по CheckBox
  $(document).on('click', 'input[type="checkbox"]', function () {
    if ($(this).is(':checked') ){ $(this).prop("checked", false).removeAttr('checked');     } 
                          else  { $(this).prop("checked", true).attr('checked', 'checked'); }
  });

  
  // Обработка кликов по строке таблицы
  $(document).on('click', '.tabfield', function () {
    // Обработка выбора всех имени  
    if ($(this).attr('id')=='checkall')
    {
     
      if ($(this).find('input[type="checkbox"]').is(':checked'))
      {
        // Снимаем выбор всех
        $('#listofuser').find('input[type="checkbox"]').prop("checked", false).removeAttr('checked');
        deleteMarkers();
      } else {
        // Выбираем все имена
        $('#listofuser').find('input[type="checkbox"]').prop("checked", true).attr('checked', 'checked');
       }


    } else  {
        if ($(this).find('input[type="checkbox"]').is(':checked')){
          // Снимаем выбор всех имен и выбранного имени
          $(this).find('input[type="checkbox"]').prop("checked", false).removeAttr('checked');
          $('#checkall').find('input[type="checkbox"]').prop("checked", false).removeAttr('checked');  
          } else {
          $(this).find('input[type="checkbox"]').prop("checked", true).attr('checked', 'checked');
        }

      }
    oMap.placeMarkers (CheckInputs ()) ; // Отображение новых маркеров на карте
  });


});