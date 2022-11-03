const {Data} = require('./data_class.js');
const {GISLayer} = require("./gislayer_class.js");

//geoJSON 
const kunnatUrl =  "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
const maakunnatUrl = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:maakunta4500k&outputFormat=json&srsName=EPSG:4326"



//Data layer (one should be able to add to it and clear it!)
const posMigDataUrl = "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f";
const negMigDataUrl = "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e";



//Statfin
url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";



//Collect ALL example data here
d = new Data('Vital statistics by Year, Area and Information',
"https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px");

d.addQuery('TQ','tq',{});