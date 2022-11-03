import {getMap} from "../data/data_tools.js";

class GISLayer {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }

    getName() {
        return this.name;
    }

    getUrl() {
        return this.url;
    }

    setUrl(url) {
        this.url = url;
    }

    setName(name) {
        this.name = name;
    }

    /*
    async fetchData() {
        const res = await fetch(this.url); 
        const res_ = await res.json();
        return res_;
    }
    */

    //Add layer directly to map
    async addLayer(map,opt={weight: 2}) {
        //const tmp = this.fetchData();
        const tmp = getMap(this.url);
        L.geoJSON(await tmp, opt).addTo(map);
    }

    //Return L.geoJSON object
    async getLayer(opt={weight: 2}) {
        //const tmp = this.fetchData();
        const tmp = getMap(this.url);
        const tmp2 =  new L.geoJSON(await tmp, opt);
        return tmp2;
    }
}

module.exports.GISLayer = GISLayer;