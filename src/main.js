import { Chart } from "../node_modules/frappe-charts/dist/frappe-charts.min.esm"
//const {GISLayer} = require("./gislayer_class.js")
import {GISLayer} from "./gislayer_class.js"
import { sidebar } from "./sidebar.js"
import { searchbar } from "./searchbar.js"
import { overallChart } from "./overall_chart.js"

/*
import data generating functions
*/
import {koulutustaso} from "../data/koulutustaso.js"
import {puoluekann} from "../data/puoluekann.js"
import {tulotaso} from "../data/tulotaso.js"
import {tyollisyys} from "../data/tyollisyys.js"
import {getMap} from "../data/data_tools.js";
import { summaryStats, summaryStats2 } from "../data/data_tools.js"



if (document.readyState !== "loading") {
    // Document ready, executing
    console.log("Document ready, executing");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
      // Document was not ready, executing when loaded
      console.log("Document ready, executing after a wait");
      initializeCode();
    });
}


async function initializeCode() {
    var parcelRequire;

    /*
    JS RESPONSIVENESS
    */
    //var x = window.matchMedia("(max-width: 800px)")

    //0. DECLARE TARGETS
        //a) Elements
        var mainLocation = document.getElementById("main");
        var dataLocation = document.getElementById("data");

        //b) URLs
        var osrUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';


    //1. ADD MAP
        //a) Add map layer 
        //DOESN'T WORK: var map = L.map('map', {minZoom: -3}); //Note: first argument here is the "id" where the map is created!
        //var map = L.map('map').setView([37.8, -96], 4); //USA
        var map = L.map('map').setView([61.9241, 25.7482], 6); //Finland


        //b) Map layer(s)
        let osm = L.tileLayer(osrUrl,{  
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        osm.addTo(map);

        let satellite = L.tileLayer(mbUrl, {
            id: 'mapbox/satellite-v9', 
            maxZoom: 19,
            tileSize: 512, 
            zoomOffset: -1, 
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        });


        //c) Tile layer
        var dataSelId; //Current selected data placeholder

        //Fetch the data
        const data = {"koulutustaso":await koulutustaso(), 
                      "puoluekannatus":await puoluekann(),//"tulotaso": await tulotaso(),
                      "työllisyys": await tyollisyys()};

        //Build data container
        const targets = {
            "koulutustaso":[
                {"data": data["koulutustaso"],
                "overallSS":summaryStats2(data["koulutustaso"]["Data1"]),
                "municipalSS":summaryStats(data["koulutustaso"]["Data2"]),
                "labels": Object.keys(data["koulutustaso"]["Data2"]["Akaa"])}
            ], 
            "puoluekannatus":[
                {"data": data["puoluekannatus"],
                "overallSS":summaryStats2(data["puoluekannatus"]["Data1"]),
                "municipalSS":summaryStats(data["puoluekannatus"]["Data2"]),
                "labels": Object.keys(data["puoluekannatus"]["Data2"]["Akaa"])}
            ],
            /*
            "tulotaso":[
                {"data": data["tulotaso"],
                "overallSS":summaryStats2(data["tulotaso"]["Data1"]),
                "municipalSS":summaryStats(data["tulotaso"]["Data2"]),
                "labels": Object.keys(data["tulotaso"]["Data2"]["Akaa"])}
            ],
            */
            "työllisyys":[
                {"data": data["työllisyys"],
                "overallSS":summaryStats2(data["työllisyys"]["Data1"]),
                "municipalSS":summaryStats(data["työllisyys"]["Data2"]),
                "labels": Object.keys(data["työllisyys"]["Data2"]["Akaa"])}
            ]};
        

        //c)
        //L.control.layers(baseMaps,overlayMaps).addTo(map);
        //L.control.layers({"OSM" : osm}).addTo(map);
        //map.removeLayer(osm); //remove layer


    //2. ADD DATA TO SIDEBAR
        //a) Data Add function/method

        //ACCORDION
        function addData(dataWindowLocation,buttonText,mainDivId,subDivIds) {

            /*
            <div class="accordion" id="accordionExample">
            ...
            </div>
            */

            var div = document.createElement("div");
            div.setAttribute("class","accordion");
            div.id = "accordionExample";

            function accordionItem(no, buttonText, mainDivId, subDivIds) {

                /*
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" 
                         data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" 
                     aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                */

                var div1 = document.createElement("div");
                div1.classList.add("accordion-item"); 
                div1.classList.add(mainDivId);

                var h2 = document.createElement("h2");
                h2.setAttribute("class","accordion-header");
                h2.id = "heading"+no;

                var button1 = document.createElement("button");
                button1.setAttribute("class","accordion-button"); 
                button1.setAttribute("type","button"); 
                button1.setAttribute("data-bs-toggle","collapse");
                button1.setAttribute("data-bs-target","#collapse"+no);
                button1.setAttribute("aria-expanded", "true");
                button1.setAttribute("aria-controls","collapse"+no);
                button1.appendChild(document.createTextNode(buttonText)); //BUTTON TITLE
                h2.appendChild(button1);
                
                var div2 = document.createElement("div");
                div2.id = "collapse"+no;
                //div2.className("accordion-collapse collapse show");
                div2.classList.add("accordion-collapse"); 
                div2.classList.add("collapse"); 
                //div2.classList.add("show"); //if show then begins open!
                div2.setAttribute("aria-labelledby", "heading"+no);
                div2.setAttribute("data-bs-parent", "#accordionExample");

                var div3 = document.createElement("div");
                div3.setAttribute("class","accordion-body");
                //div3.innerHTML = "CONTENTS HERE"; //TEXT THERE
                div3.appendChild(listGroup(mainDivId,subDivIds));
                //div3.appendChild(document.createTextNode("CONTENTS HERE..."));
                div2.appendChild(div3);
                //
                div1.appendChild(h2);
                div1.appendChild(div2);

                return div1;
            }


            //LIST GROUP
            function listGroup(mainDivId,subDivIds) {
                /*
                <ul class="list-group">
                <li class="list-group-item">An item</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
                <li class="list-group-item">A fourth item</li>
                <li class="list-group-item">And a fifth one</li>
                </ul>
                */
                var ul = document.createElement("ul");
                ul.className = "list-group";
                for(var id of subDivIds) {
                    const li = document.createElement("li");
                    li.id = id;
                    //li.className = mainDivId;
                    li.classList.add("list-group-item"); li.classList.add(mainDivId);
                    li.appendChild(document.createTextNode(id));
                    li.draggable = true; //make draggable
                    ul.appendChild(li);
                }

                return ul;
            }

            //const noS = ['One','Two','Three']
            for (var i=0; i<buttonText.length; i++) {
                div.appendChild(accordionItem(i,buttonText[i],mainDivId[i],subDivIds[i]));
            }

            dataWindowLocation.appendChild(div);

            //add drag listeners
            for(var i=0; i < buttonText.length; i++) {
                for(var id of subDivIds[i]) {
                    document.getElementById(id).addEventListener('dragstart', (e) => {
                        e.dataTransfer.setData('text/plain', JSON.stringify([e.target.classList.item(1), e.target.id]));
                        //e.dataTransfer.setData('text', JSON.stringify([e.target.classList.item(1), e.target.id]));
                        setTimeout(() => {
                            e.target.classList.add('hide');
                        }, 0);
                    });
                }
            }
        }

        const buttonText = ["Koulutustaso", "Puoluekannatus","Työllisyys"];
        const buttonId = ["koulutustaso", "puoluekannatus","työllisyys"];
        const dataContainer = [targets["koulutustaso"][0]["labels"], 
                      targets["puoluekannatus"][0]["labels"],
                      targets["työllisyys"][0]["labels"]];
        
        addData(dataLocation,buttonText,buttonId,dataContainer);
        //sidebar logic
        //sidebar();
        //

        /*
        function addData2(dataWindowLocation,buttonText,mainDivId,subDivIds) {
            //https://www.w3schools.com/howto/howto_js_accordion.asp
            var div1 = document.createElement("div");
            div1.setAttribute("class",mainDivId);
            var button = document.createElement("button");
            button.setAttribute("class","accordion");
            //button.setAttribute("value",buttonText);
            button.innerHTML = buttonText;
            var div2 = document.createElement("div");
            div2.setAttribute("class","panel");
            for(var t of subDivIds) {
                var p = document.createElement("p");
                p.setAttribute("id",t); //make sure no other button has this id
                p.setAttribute("class",mainDivId);
                //p.setAttribute("draggable",true);
                p.draggable = true;
                p.appendChild(document.createTextNode(t));
                div2.appendChild(p);
            }
            div1.appendChild(button);
            div1.appendChild(div2);
            dataWindowLocation.appendChild(div1);

            for(var t of subDivIds) {
                //make this <p>...</p> draggable
                document.getElementById(t).addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', JSON.stringify([e.target.className, e.target.id]));
                    setTimeout(() => {
                        e.target.classList.add('hide');
                    }, 0);
                });
            }
        }
        */

        //a) Add Data
        //addData(dataLocation,"Puoluekannatukset alueittain 2017","Query1");
        //addData(dataLocation,"Koulutus alueittain 2020","Query2");


        /*
        addData(dataLocation,"Koulutaso alueittain 1970-2020","koulutustaso");
        addData(dataLocation,"Puoluekannatus alueittain 1970-2018","puoluekannatus");
        addData(dataLocation,"Tulotaso alueittain 1970-2018","tulotaso");
        addData(dataLocation,"Työllisyys alueittain 1970-2018","työllisyys");
        */
        //addData2(dataLocation,"Koulutaso","koulutustaso",targets["koulutustaso"][0]["labels"]);
        //addData2(dataLocation,"Puoluekannatus","puoluekannatus",targets["puoluekannatus"][0]["labels"]);
        // //addData2(dataLocation,"Tulotaso","tulotaso",targets["tulotaso"][0]["labels"]);
        //addData2(dataLocation,"Työllisyys","työllisyys",targets["työllisyys"][0]["labels"]);

        //




        //b) Add MapLayers
        const maakUrl = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:maakunta4500k&outputFormat=json&srsName=EPSG:4326";
        const kunnUrl = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
        //var gl_ku = new GISLayer("Maakunnat","https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:maakunta4500k&outputFormat=json&srsName=EPSG:4326");
        //var gl_mk = new GISLayer("Kunnat","https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326");
        //gl_mk.addLayer(map);
        //gl_ku.addLayer(map);
        //var maakLayer = gl_mk.getLayer();
        //var kunnLayer = gl_ku.getLayer();

        //const tmp = await getMap(maakUrl);
        const mapData = await getMap(kunnUrl);
        var geoJSON =  L.geoJSON(mapData, {
            weight: 2,
        });
        geoJSON.addTo(map);


        //search bar logic
        //-zoom in on the municipality (data doesn't have to be loaded as this is feature bound to the geoJSON)
        searchbar(map,geoJSON);
        //

        
        let nClass = 5; //number of color classes in the discrete legend
        let colors = ['#FC4E2A', '#FD8D3C', '#FEB24C', '#FED976', '#FFEDA0'];
        //let colors = ['#800026', '#BD0026', '#E31A1C', '#FC4E2A', '#FD8D3C', '#FEB24C', '#FED976', '#FFEDA0']; //legend colors
        //let colors = ['#800026','#E31A1C','#FD8D3C','#FED976'];
        //let nClass = 4;


        function grades(dataSelId,layerName) {
            const idx = targets[dataSelId][0]["labels"].findIndex(object => {return object === layerName;});
            let min = targets[dataSelId][0]["overallSS"][idx][0]; //min
            let max = targets[dataSelId][0]["overallSS"][idx][1]; //max
            
            //min = Math.log(min+1); 
            //max = Math.log(max+1);
            let step = Math.abs(max-min)/nClass;

            let levels = [];

            let cval = 0.0;
            for(var i = 0; i < nClass; i++) {
                levels.push(cval)
                cval += step;
            }
            return levels;
        }


        function setUpLayer(geoJSON, layerName, dataSelId) {

            console.log(layerName)
            var idx = targets[dataSelId][0]["labels"].findIndex(object => {return object === layerName;});
            console.log(idx)
            //console.log(layerName)

            //layer colors based on the current data
            geoJSON.eachLayer(function(layer) {
                const id = layer.feature.properties.name;
                console.log(id);

                //let popupChart;
                layer.bindPopup( //this only applied to the 
                `<div>Municipality name: ${id}</div>
                <br><div class="popup-chart" id="data-chart-${id}"></div>
                <div id="popup-chart-container">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="popup-chart-radio-button" id="select-line-${id}" value="line">
                        <label class="form-check-label" for="select-line-${id}">Line</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="popup-chart-radio-button" id="select-bar-${id}" value="bar">
                        <label class="form-check-label" for="select-bar-${id}">Bar</label>
                    </div>
                    <br>
                    <div>
                        <button class="btn btn-outline-success" id="popup-export-${id}" type="button">Export</button>
                    </div>
                </div>`, //<input type="button" id="popup-export-${id}" value="Export"></input>
                {minWidth: '600'});

                let val;
                if (targets[dataSelId][0]["municipalSS"][id]) { 
                    //val = targets[dataSelId][0]["municipalSS"][id][layerName][2]; //mean
                    val = targets[dataSelId][0]["municipalSS"][id][layerName][3]; //median
                } else {
                    val = null;
                }
                //console.log(val)

                //Stylize the layer
                function getColor(id) { // WHY ARE ALL THE COLORS WRONG??
                    //if (targets[dataSelId][0]["municipalSS"][id]) {
    
                        //let val = targets[dataSelId][0]["municipalSS"][id][layerName][2]; //mean
                        let min = targets[dataSelId][0]["overallSS"][idx][0]; //min
                        let max = targets[dataSelId][0]["overallSS"][idx][1]; //max
                        
                        //change to log 
                        //min = Math.log(min+1); 
                        //max = Math.log(max+1);
                        //const val_ = Math.log(val+1);
                        //

                        const step = Math.abs(max-min)/nClass;

                        let cval = 0.0;
                        for(var i = 0; i < nClass; i++) {
                            cval += step;
                            if (cval>=val) {
                                //console.log("RETURNED COLOR: "+cval+", "+val+", "+id+", "+dataSelId+", "+colors[i]);
                                return colors[i];
                            }
                            //cval += step;
                        }
                        //console.log("FAILED: "+val+","+cval);

                    //} else { //if not found
                    //    console.log("NOT FOUND: "+colors[0]);
                    //    return colors[0];
                    //}
                }


                // Set styles (set one for each data )
                const col = getColor(id);
                layer.setStyle({//color: `${col}`,
                                color: 'white',
                                fillColor: `${col}`, //Get color might have to be pre-set: e.g according to statistics;
                                weight: 2,
                                opacity: 0.8, 
                                dashArray: '3',
                                fillOpacity: 0.7});

                //Click event
                /*
                -Show municipality name
                -Show time-series chart
                */
                layer.on('click', function (e) {
                    if(layerName && targets[dataSelId][0]["data"]["Data2"][id]) { //make sure dataset exists

                        const popupChartTypeSelector = document.querySelectorAll('input[name=popup-chart-radio-button]');
                        for (const radio of popupChartTypeSelector) {
                            radio.onclick = (e) => {

                                //reag aggregation method from the button
                                const buttonVal = e.target.value;
       
                                const datasets = [];
                                for(var e of Object.keys(targets[dataSelId][0]["data"]["Data2"][id])) {
                                    datasets.push({name: e, values: targets[dataSelId][0]["data"]["Data2"][id][e]});
                                }
                                
                                const labels = [];
                                for(var i = 0; i < Object.keys(targets[dataSelId][0]["data"]["Data1"][id]).length; i++) {
                                    labels.push((Object.keys(targets[dataSelId][0]["data"]["Data1"][id])[i]).substring(2,5));
                                }

                                const chartData =  {
                                    labels: labels,
                                    datasets: datasets
                                };
                            
                        
                                const popupChart = new Chart("#data-chart-"+id, { //new frappe.Chart("#data-chart-"+layer.feature.properties.name, {
                                title: "Complete data in "+id,
                                data: chartData,
                                type: buttonVal, //"bar",
                                height: 300,
                                width: 600,
                                //xIsSeries: 1,
                                lineOptions: {
                                    hideDots: 0,
                                    regionFill: 0
                                },
                                barOptions: {
                                    spaceRatio: 0.2,
                                    stacked: 1    // default 0, i.e. adjacent
                                }
                                })
                                
                                //Export-chart functionality
                                document.getElementById("popup-export-"+id).addEventListener("click",()=>{
                                    popupChart.export();
                                });

                            }
                        }

                    }
                });


                layer.on('mouseover', function(){
                    //info.update(layer.feature.properties);
                    info.update(val,id);
                });
                layer.on('mouseout', function(){
                    info.update();
                });


 
            });

            //Update overall chart
            overallChart(targets,"bar",dataSelId,layerName);
        }


        //Add baselayers and overlay to map
        var info = null;
        var legend = null;
        var layerControl = new L.control.layers(null, null).addTo(map);

        //map.addLayer(maakLayer);
        //L.control.layers({"Maakunnat": maakLayer, "Kunnat": kunnLayer}).addTo(map);
        //var baseMaps = {"OSM" : osm, "Satellite": satellite};
        //var overlayMaps;// = {"Data1" : geoJSON};
        //L.control.layers(baseMaps,overlayMaps).addTo(map);
        layerControl.addBaseLayer(osm,"OSM");
        layerControl.addBaseLayer(satellite,"Satellite");

    //3. ADD DRAG 'N' DROP LISTENER
        //a) Handling the drop and updating the map
        function dropLogic(listenerTargetElement) { 
            listenerTargetElement.addEventListener('dragenter', dragEnter);
            listenerTargetElement.addEventListener('dragover', dragOver);
            listenerTargetElement.addEventListener('dragleave', dragLeave);
            listenerTargetElement.addEventListener('drop', drop);
    
            function dragEnter(e) {
            e.preventDefault();
            e.target.classList.add('drag-over');
            }
    
            function dragOver(e) {
            e.preventDefault();
            e.target.classList.add('drag-over');
            }
    
            function dragLeave(e) { 
            e.target.classList.remove('drag-over'); 
            }
    
            async function drop(e) {
                e.preventDefault();
                e.target.classList.remove('drag-over');
        
                // need to specify DRAG event somewhere
                // get the draggable element
                const dropContent = JSON.parse( e.dataTransfer.getData('text/plain') ); //remember to turn this BACK to an array! from JSON.stringfy() to JSON.parse()
                const id = dropContent[0];
                const layerName = dropContent[1];

                //const draggable = document.getElementById(id);
                //console.log(id);

                //set the current data based on the drag n drop target
                //this is the whole basis on HOW 
                //-legend is generated
                //-how the chart is named
                //-how the overlay is named
                dataSelId = id;
                //kt = targets[id];
                console.log(dataSelId);

                layerControl.removeLayer(geoJSON);

                //choose one EXAMPLE layer
                //const layerName = targets[dataSelId][0]["labels"][3];
                //console.log(layerName)

                setUpLayer(geoJSON,layerName,dataSelId);
                layerControl.addOverlay(geoJSON, layerName);

                //layerControl.addOverlay(geoJSON, dataSelId);

                //calculate overall summary stats
                //console.log(targets[dataSelId][0]["overallSS"]);
                //console.log(targets[dataSelId][0]["municipalSS"]);
                //

                //HOVER
                //https://leafletjs.com/examples/choropleth/
                if(!(info===null)) {
                    map.removeControl(info);
                }
                info = L.control({position: 'bottomleft'});
                info.onAdd = function (map) {
                    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                    this.update();
                    return this._div;
                };
                
                // method that we will use to update the control based on feature properties passed
                info.update = function (val, name) { //' people / mi<sup>2</sup>'
                    this._div.innerHTML = `<h4>${layerName}</h4>` +  (val ?
                        '<b>' + name + '</b><br />' + (Math.round(val*100)/100).toLocaleString('fi-FI')
                        : 'Hover over a municipality');
                };
                
                info.addTo(map);



                //LEGEND
                if(!(legend===null)) {
                    map.removeControl(legend);
                    //layerControl.removeLayer(legend) 
                }
                legend = L.control({position: 'bottomright'});
                //https://leafletjs.com/examples/choropleth/
                legend.onAdd = function (map) {
                    var div = L.DomUtil.create('div', 'info legend');
                        const levels = grades(dataSelId,layerName);

                        //grades = [0, 10, 20, 50, 100, 200, 500, 1000],
                    // loop through our density intervals and generate a label with a colored square for each interval
                    div.innerHTML += `<h4>${layerName}</h4>`;
                    for (var i = 0; i < nClass; i++) {
                        div.innerHTML +=
                            '<i style="background:'+colors[i]+'"></i> ' +
                            (Math.round(levels[i]*100)/100).toLocaleString('fi-FI') + (levels[i + 1] ? '&ndash;' + (Math.round(levels[i + 1]*100)/100).toLocaleString('fi-FI') + '<br>' : '+');
                    }
        
                    return div;
                };
                legend.addTo(map);

                    //

                /*
                if(!(legend===null)) {
                    map.removeControl(legend);
                    //layerControl.removeLayer(legend) 
                }
                legend = L.control({position: 'bottomright'});
                //https://leafletjs.com/examples/choropleth/
                legend.onAdd = function (map) {
                    var div = L.DomUtil.create('div', 'info legend');
                        const levels = grades(dataSelId,layerName);

                        //grades = [0, 10, 20, 50, 100, 200, 500, 1000],
                    // loop through our density intervals and generate a label with a colored square for each interval
                    div.innerHTML += `<h4>${layerName}</h4>`;
                    for (var i = 0; i < nClass; i++) {
                        div.innerHTML +=
                            '<i style="background:'+colors[i]+'"></i> ' +
                            (Math.round(levels[i]*100)/100).toLocaleString('fi-FI') + (levels[i + 1] ? '&ndash;' + (Math.round(levels[i + 1]*100)/100).toLocaleString('fi-FI') + '<br>' : '+');
                    }
        
                    return div;
                };
                legend.addTo(map);
                */
        
                // add it to the drop target
                //e.target.appendChild(draggable);
        
                // display the draggable element
                //draggable.classList.remove('hide');
            }
        }
    
    
        //b) Add drop logic to target
        dropLogic(mainLocation);

}