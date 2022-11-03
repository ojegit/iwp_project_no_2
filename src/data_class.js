class Data {
    //Purpose: store all the data series and related queries 
    constructor(name, url) {
        this.name = name;
        this.url = url;
        this.queries = [];
    }

    addQuery(query_name_, description_, query_) {
        //this.queries.push({[query_name]: query_})
        this.queries[query_name_] = {'description': description_, 
                                     'query': query_};
    }

    removeQuery(query_name_) {
        //Source: https://stackoverflow.com/questions/51724323/javascript-removing-object-from-array-by-key-value
        //const index = queries.findIndex(queries => queries.description === query_name);
        //if (index > -1) { queries.splice(index, 1); }
        delete this.queries[query_name_];
    }

    removeAllQueries() {
        for(var q in this.queries) {
            delete this.queries[q];
        }
        //this.queries.length = 0; //DOESN'T WORK
    }

    getAllQueries() {
        return Object.keys(this.queries);
    }

    getQuery(query_name) {
        return this.queries[query_name];
    }

    executeQuery(query_name) {
        return fetchData(this.url,this.queries[query_name].query);
    }
}



//General fetch function w url and JSON query
async function fetchData(url,jsonQuery) {
  //const url = "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/evaa/020_evaa_2019_tau_120.px"
  const response = await fetch(url,{
      method: "POST", //"POST",
      headers: {"content-type":"application/json"},
      body: JSON.stringify(jsonQuery)
  })
  if(!response.ok) {
      console.error('Response not OK! URL: '+url+ ', QUERY: '+jsonQuery);
      return;
  }
  const data = await response.json()
  return data
}

module.exports.Data = Data;