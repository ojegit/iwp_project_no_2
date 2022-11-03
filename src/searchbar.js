function searchbar(map,geoJSON) {
    var searchButton = document.getElementById("search-button");
    var clearSearchButton = document.getElementById("clear-search-button");
    var searchBar = document.getElementById("search-bar");
    let prevOpacity;
    let prevFillOpacity;
    let prevWeight;
    let i = 0;
    let searchHistory = [];

    //add listener to the button

    /*
    -Highlight all searched municipalities, dim the rest
    -When hitting the clear button the map is returned to normal
    */
    searchButton.addEventListener('click', function() {
        //find the municipality and zoom in on it
        /*
        geoJSON.eachLayer(function(layer) {    
            layer.setStyle({opacity: prevOpacity, fillOpacity: prevFillOpacity, weight: prevWeight});
        });
        */
        let j = 0;
        geoJSON.eachLayer(function(layer) {
            //get the default values (once per load)
            
            if(i==0) {
                prevOpacity = layer.options.opacity;
                prevFillOpacity = layer.options.fillOpacity;
                prevWeight = layer.options.weight;
                i++;
            }
            

            //compare the inserted "text" to layer/GIS name
            if(j==0 && (layer.feature.properties.name.toLowerCase() === searchBar.value.toLowerCase())) {
                searchHistory.push(searchBar.value.toLowerCase());
                j++;
            }
        });


        //apply the visuals
        geoJSON.eachLayer(function(layer) {
            const id = layer.feature.properties.name;
            var idx = searchHistory.findIndex(function(object) { //if not found returns -1
                if(object===id.toLowerCase()){ return object } else { return false }
            });

            if(!(idx === -1)) { //highlight all of the searched 
                layer.setStyle({opacity: 1, fillOpacity: 1, weight:8});
            } else { //dim the rest
                layer.setStyle({opacity: 0.5, fillOpacity: 0.5, weight: prevWeight});
            }
        });

        //finally, zoom in on the result
        geoJSON.eachLayer(function(layer){
            if(layer.feature.properties.name.toLowerCase() === searchHistory[searchHistory.length-1]) {
                map.fitBounds(layer.getBounds());
            }
        });
    });

    clearSearchButton.addEventListener('click', function() {
        if(searchHistory.length > 0) {
            searchHistory = []; //empty search history
            geoJSON.eachLayer(function(layer) {layer.setStyle({opacity: prevOpacity, fillOpacity: prevFillOpacity, weight: prevWeight});});
        }
    });

}
module.exports.searchbar = searchbar;