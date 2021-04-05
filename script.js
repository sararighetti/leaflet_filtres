var map = L.map('mapid').on('load', onMapLoad).setView([41.400, 2.206], 9);
var marker;

// NIVEL 3: El centre del mapa ha de ser la nostra posició GPS real actual. 

//Metodo con map.locate
//map.locate({setView: true, maxZoom: 17});

// Metodo con navigator.geolocation
getLocation(); 

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}
function showPosition(position) {
	map.setView([position.coords.latitude, position.coords.longitude], 17);
}
	
let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

let iconMarker = L.icon({
	iconUrl:'food_place_marker_.png',
	iconSize: [50, 32],
	iconArchor: [25, 16]
});
//en el clusters almaceno todos los markers
var markers = L.markerClusterGroup();
var data = [];

async function onMapLoad() {

	console.log("Mapa cargado");
    /*
	FASE 3.1
		1) Relleno el data_markers con una petición a la api
		2) Añado de forma dinámica en el select los posibles tipos de restaurantes
		3) Llamo a la función para --> render_to_map(data_markers, 'all'); <-- para mostrar restaurantes en el mapa
	*/
	console.log("Mapa cargado");
//FASE 3.1 
//#1 Relleno el data con una petición a la api 
	let response = await fetch("http://localhost/mapa/api/apiRestaurants.php");
	data = await response.json();
//	console.log(data); 

	for (item of data) {
		markers.addLayer(L.marker([item.lat, item.lng], {icon:iconMarker})
		.bindPopup("<b>Restaurant</b>: " + item.restaurants + "<br>" + "<b>Direcciòn</b>: " + item.address + "<br>" + "<b>Tipo de comida</b>: " + item.kind_food));		
	} 
map.addLayer(markers);

// 2) Añado de forma dinámica en el select los posibles tipos de restaurantes
	let kindFood = [];
	 for (let i=0; i<data.length; i++) {
		let splitArray = data[i].kind_food.split(',');
		kindFood.push(splitArray);	
	} ;	
//Array con todos los kind of food.
 	let allKindsOfFood = [];
	for(let i = 0; i < kindFood.length; i++) {
		allKindsOfFood = allKindsOfFood.concat(kindFood[i]);	
	} 	
// New array sin kind of food repetidos 
 	let arrayToSet = new Set(allKindsOfFood);
	let KindFoodSinRepeticiones = Array.from(arrayToSet);
	KindFoodSinRepeticiones.sort();
	KindFoodSinRepeticiones.unshift("Todos");  

// imprimo los tipo de comida para que el usuario pueda buscar el tipo de restaurante que quiere 
	for (let i=0; i<KindFoodSinRepeticiones.length; i++) {
		$("#kind_food_selector").append("<option>"+ KindFoodSinRepeticiones[i] + "</option>");
		}
	$('#kind_food_selector').on('change', function() {
		//console.log(this.value);
		render_to_map(data, this.value);		
	 });
}

function render_to_map(data,filter){
/*FASE 3.2	*/	
console.log(data);
/*1) Limpio todos los marcadores */
markers.clearLayers();
/*	2) Realizo un bucle para decidir que marcadores cumplen el filtro, y los agregamos al mapa*/	
	for (item of data) {
		if (item.kind_food.includes(filter)) {
			markers.addLayer(L.marker([item.lat, item.lng], {icon:iconMarker})
				.bindPopup("<b>Restaurant</b>: " + item.restaurants + "<br>" + "<b>Direcciòn</b>: " + item.address + "<br>" + "<b>Tipo de comida</b>: " + item.kind_food));
		} if (filter === "Todos"){ // para volver a mostrar todos los restaurantes
			markers.addLayer(L.marker([item.lat, item.lng], {icon:iconMarker})
			.bindPopup("<b>Restaurant</b>: " + item.restaurants + "<br>" + "<b>Direcciòn</b>: " + item.address + "<br>" + "<b>Tipo de comida</b>: " + item.kind_food));		
		} 
	}
map.addLayer(markers); 
						
}