let year = 2011
let pollutant = "geonode:dustd"
let change, air, greenbegin, greenar, bla, uri, sentinelHub, actual, month, density

var slider = document.getElementById("range");

	
function myFunction() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
	  x.className += " responsive";
	} else {
	  x.className = "topnav";
	}
  }

const MAP = L.map('map').setView([40.18, 44.499711], 12);
const URL_OSM = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

let OSM = L.tileLayer(URL_OSM);

MAP.addLayer(OSM);

const BASE_LAYERS = {
	'OpenStreetMap': OSM,
};


function deleteLegend() {
	var list = document.getElementsByClassName("leaflet-control-wms-legend");
	for(var i = list.length - 1; 0 <= i; i--)
	if(list[i] && list[i].parentElement)
	list[i].parentElement.removeChild(list[i]);
	var lists = document.getElementsByClassName("leaflet-control-layers leaflet-control");
	for(var i = lists.length - 1; 0 <= i; i--)
	if(lists[i] && lists[i].parentElement)
	lists[i].parentElement.removeChild(lists[i])
}


var x = document.getElementById("slidecontainer").querySelectorAll("button").forEach(button=>{
	button.onclick = function(){
		document.getElementById("slidecontainer").querySelectorAll("button").forEach(button=>{
			button.style.backgroundColor = "green"})
	button.style.backgroundColor = "red"
	pollutant = pollutant.slice(0, -4); 
	pollutant = "geonode:"+this.value
	pollutants()
}})

var ab = document.getElementById("slidecontainer2").querySelectorAll("button").forEach(butto=>{
	butto.onclick = function(){
		document.getElementById("slidecontainer2").querySelectorAll("button").forEach(butto=>{
			butto.style.backgroundColor = "green"})
	butto.style.backgroundColor = "red"
	greenar = "geonode:selected_"+this.value
	console.log(greenar)
	greenAreas()
}})

function aq() {
	MAP.setView(new L.LatLng(40.18, 44.499711), 11);
	deleteLegend()
	document.getElementById("slidecontainer").style.display = "block";
	document.getElementById("slidecontainer2").style.display = "none";
	document.getElementById("slidecontainer4").style.display = "none";
	document.getElementById("slidecontainer3").style.display = "none";
	MAP.eachLayer(function (layer) {
        MAP.removeLayer(layer);
    });
	OSM = L.tileLayer(URL_OSM, {
		opacity: 1
	});
	MAP.addLayer(OSM);

	if (pollutant.length < 15){pollutant = "geonode:dustd2011"}
	air = L.tileLayer.wms('http://vgse.geology.am/geoserver/geonode/wms?', {
		layers:pollutant,
		transparent: true,
		format: 'image/png',
	})
	MAP.addLayer(air)
	uri = "./"
	uri += pollutant.substring(8).slice(0, -4)
	uri += "_legend.png"
	L.wmsLegend(uri);
}
function ga() {
	MAP.setView(new L.LatLng(40.18, 44.499711), 12);
	deleteLegend()
	document.getElementById("slidecontainer").style.display = "none";
	document.getElementById("slidecontainer2").style.display = "block";
	document.getElementById("slidecontainer3").style.display = "none";
	document.getElementById("slidecontainer4").style.display = "none";
	MAP.eachLayer(function (layer) {
        MAP.removeLayer(layer);
    });
	OSM = L.tileLayer(URL_OSM, {
		opacity: 1
	});
	MAP.addLayer(OSM);
	greenbegin = L.tileLayer.wms('http://vgse.geology.am/geoserver/geonode/wms?', {
		layers:"geonode:average",
		transparent: true,
		format: 'image/png',
		maxcc:20, 
 	 	minZoom:1, 
 	 	maxZoom:20, 
	})
	MAP.addLayer(greenbegin)
	uri = "./green_areas.png"
	L.wmsLegend(uri);
	if (greenar) {greenAreas()}
}

function density2() {
	MAP.setView(new L.LatLng(40.18, 44.499711), 11);
	deleteLegend()
	document.getElementById("slidecontainer").style.display = "none";
	document.getElementById("slidecontainer2").style.display = "none";
	document.getElementById("slidecontainer3").style.display = "none";
	document.getElementById("slidecontainer4").style.display = "none";
	MAP.eachLayer(function (layer) {
        MAP.removeLayer(layer);
    });
	OSM = L.tileLayer(URL_OSM, {
		opacity: 0.5
	});
	MAP.addLayer(OSM);
	density = L.tileLayer.wms('http://vgse.geology.am/geoserver/geonode/wms?', {
		layers:"geonode:districts",
		transparent: true,
		format: 'image/png',
		maxcc:20, 
 	 	minZoom:1, 
 	 	maxZoom:20, 
	})
	MAP.addLayer(density)
	uri = "./density.png"
	L.wmsLegend(uri);
}

function no() {
	document.getElementById("slidecontainer").style.display = "none";
	document.getElementById("slidecontainer2").style.display = "none";
	document.getElementById("slidecontainer4").style.display = "none";
	document.getElementById("slidecontainer3").style.display = "block";
	deleteLegend()
	MAP.setView(new L.LatLng(40.737, 44.923), 6);
	MAP.eachLayer(function (layer) {
        MAP.removeLayer(layer);
    });
	OSM = L.tileLayer(URL_OSM, {
		opacity: 1
	});
	MAP.addLayer(OSM);
	let baseUrl = " https://creodias.sentinel-hub.com/ogc/wms/a383b8d8-52dd-4976-8d26-3d80bf28843a";
let sentinelHub = L.tileLayer.wms(baseUrl, {
    tileSize: 512,
    attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
    	 	 	 	urlProcessingApi:" https://creodias.sentinel-hub.com/ogc/wms/f9f27612-5c05-4d61-892e-78d50790da0e", 
 	 	 	 	maxcc:20, 
 	 	 	 	minZoom:1, 
 	 	 	 	maxZoom:16, 
 	 	 	 	preset:"NOO", 
 	 	 	 	layers:"NOO", 
				transparent: true,
				opacity: 0.6

});
	uri = "./nitrogen_legend.png"
	L.wmsLegend(uri);
	MAP.addLayer(sentinelHub)
}


function so() {
	document.getElementById("slidecontainer").style.display = "none";
	document.getElementById("slidecontainer2").style.display = "none";
	document.getElementById("slidecontainer3").style.display = "block";
	document.getElementById("slidecontainer4").style.display = "none";

	deleteLegend()
	MAP.setView(new L.LatLng(40.737, 44.923), 6);
	MAP.eachLayer(function (layer) {
        MAP.removeLayer(layer);
    });
	OSM = L.tileLayer(URL_OSM, {
		opacity: 1
	});
	MAP.addLayer(OSM);
	let baseUrl = " https://creodias.sentinel-hub.com/ogc/wms/a383b8d8-52dd-4976-8d26-3d80bf28843a";
	let sentinelHub = L.tileLayer.wms(baseUrl, {
		tileSize: 512,
		attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
						   urlProcessingApi:" https://creodias.sentinel-hub.com/ogc/wms/f9f27612-5c05-4d61-892e-78d50790da0e", 
						maxcc:20, 
						minZoom:1, 
						maxZoom:16, 
						preset:"SOO", 
						layers:"SOO", 
					transparent: true,
					opacity: 0.6
	
	});
	uri = "./sulphure_legend.png"
	L.wmsLegend(uri);
	MAP.addLayer(sentinelHub)
}

function ndvi() {
	MAP.setView(new L.LatLng(40.18, 44.499711), 12);
	document.getElementById("slidecontainer").style.display = "none";
	document.getElementById("slidecontainer2").style.display = "none";
	document.getElementById("slidecontainer3").style.display = "none";
	document.getElementById("slidecontainer4").style.display = "block";
	deleteLegend()
	MAP.eachLayer(function (layer) {
        MAP.removeLayer(layer);
    });
	OSM = L.tileLayer(URL_OSM, {
		opacity: 1
	});
	MAP.addLayer(OSM);
	let baseUrl = "https://services.sentinel-hub.com/ogc/wms/e67c2c68-acb2-4341-8b5a-0a3563ec9477";
	let sentinelHub = L.tileLayer.wms(baseUrl, {
    tileSize: 512,
    attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
    	 	 	 	urlProcessingApi:"https://services.sentinel-hub.com/ogc/wms/f9f27612-5c05-4d61-892e-78d50790da0e", 
 	 	 	 	maxcc:20, 
 	 	 	 	minZoom:6, 
 	 	 	 	maxZoom:16, 
 	 	 	 	preset:"NDVI2", 
 	 	 	 	layers:"NDVI2", 
 	 	 	 	time:"2021-11-01/2021-12-13", 

});
	uri = "./ndvi.png"
	L.wmsLegend(uri);
	MAP.addLayer(sentinelHub)
}

function onEachFeature(feature, layer) {
	var popupContent = document.createElement("img");
	popupContent.onload = function () {
	};
	popupContent.src = feature.properties.source
	layer.bindPopup(popupContent, {
	  maxWidth: "auto"
	});
	
}
document.getElementById("range").addEventListener('input',function(){
	pollutant = pollutant.slice(0, -4); 
	year=this.value
	pollutants()
})

document.getElementById("range2").addEventListener('input',function(){
	month=this.value
	ndvi2()
})


 function pollutants() {
	deleteLegend()
	MAP.eachLayer(function (layer) {
        MAP.removeLayer(layer);
    });
	OSM = L.tileLayer(URL_OSM, {
		opacity: 1
	});
	MAP.addLayer(OSM);
	pollutant = (pollutant+year).toString();
	console.log(pollutant)
	air = L.tileLayer.wms('http://vgse.geology.am/geoserver/geonode/wms?', {
	  layers:pollutant,
	  transparent: true,
	  format: 'image/png',
  	})
  	MAP.addLayer(air)
		uri = "./"
		uri += pollutant.substring(8).slice(0, -4)
		uri += "_legend.png"
  	L.wmsLegend(uri);
  }

function ndvi2() {
	month = "2021-0"+month+"-01/2021-0"+month+"-31"
	MAP.eachLayer(function (layer) {
        MAP.removeLayer(layer);
    });
	let baseUrl = "https://services.sentinel-hub.com/ogc/wms/e67c2c68-acb2-4341-8b5a-0a3563ec9477";
	sentinelHub = L.tileLayer.wms(baseUrl, {
    tileSize: 512,
    attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
    	 	 	 	urlProcessingApi:"https://services.sentinel-hub.com/ogc/wms/f9f27612-5c05-4d61-892e-78d50790da0e", 
 	 	 	 	maxcc:80, 
 	 	 	 	minZoom:1, 
 	 	 	 	maxZoom:20, 
 	 	 	 	preset:"NDVI2", 
 	 	 	 	layers:"NDVI2", 
 	 	 	 	time:month, 
				priority:"leastCC"
	});
	MAP.addLayer(sentinelHub)
}

function greenAreas() {
	if (MAP.hasLayer(air)) {MAP.removeLayer(air)}
	if (MAP.hasLayer(change)) {MAP.removeLayer(change)}
	else {
		uri = "./decrease.png"
		L.wmsLegend(uri);
	}
	if (MAP.hasLayer(sentinelHub)) {MAP.removeLayer(sentinelHub)}

	greenar = greenar.toString();
	change = L.tileLayer.wms('http://vgse.geology.am/geoserver/geonode/wms?', {
	  layers:greenar,
	  transparent: true,
	  format: 'image/png',
	 })
 	 MAP.addLayer(change)

	actual = L.geoJSON([examples], {
	style: function (feature) {
		return feature.properties && feature.properties.style;
	},

	onEachFeature: onEachFeature,
	
	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, {
			radius: 8,
			fillColor: feature.properties.colour,
			color: "#000",
			weight: 1,
			opacity: 1,
			fillOpacity: 0.8
		});
	}
})
	if  (MAP.hasLayer(actual)) {}
	else {actual.addTo(MAP)}
}

function temp() {
	document.getElementById("slidecontainer").style.display = "none";
	document.getElementById("slidecontainer2").style.display = "none";
	document.getElementById("slidecontainer4").style.display = "none";
	document.getElementById("slidecontainer3").style.display = "none";
	deleteLegend()
	MAP.setView(new L.LatLng(40.737, 44.923), 6);
	MAP.eachLayer(function (layer) {
        MAP.removeLayer(layer);
    });
	OSM = L.tileLayer(URL_OSM, {
		opacity: 0.2
	});
	MAP.addLayer(OSM);
	let Temp = L.tileLayer('http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=d22d9a6a3ff2aa523d5917bbccc89211', {
            maxZoom: 18,
            attribution: '&copy; <a href="http://owm.io">VANE</a>',
            id: 'temp'
        }),

    Precipitation = L.tileLayer('http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=f466fdb011dd120b3154ab340f205774', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://owm.io">VANE</a>'
    }),
    Wind = L.tileLayer('http://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=f466fdb011dd120b3154ab340f205774', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://owm.io">VANE</a>'
    }),
    Pressure = L.tileLayer('http://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=f466fdb011dd120b3154ab340f205774', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://owm.io">VANE</a>'
    }),
    Clouds = L.tileLayer('http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=f466fdb011dd120b3154ab340f205774', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://owm.io">VANE</a>'
    });
	deleteLegend()
	MAP.addLayer(Temp)	
	var overlays = {"Temperature": Temp, "Precipitation": Precipitation, "Clouds": Clouds, "Pressure": Pressure, "Wind": Wind};
    L.control.layers(overlays).addTo(MAP)
}