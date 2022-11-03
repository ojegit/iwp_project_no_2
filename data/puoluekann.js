
import {getQuery, postQuery} from "./data_tools.js"


/*
Puoluekannatukset prosentteina vuosittain ja alueittain (municipalities), alueet muokattu 
"https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"
mukaisten nimitysten mukaan!
*/

async function puoluekann() {
  const munUrl = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
  const url = 'https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/kvaa/020_kvaa_2017_tau_102.px';

  let query1 = {
    "query": [
      {
        "code": "Alue",
        "selection": {
          "filter": "item",
          "values": [
            "011091",
            "023018",
            "021049",
            "021078",
            "021092",
            "021106",
            "023149",
            "021186",
            "022224",
            "021235",
            "021245",
            "021257",
            "023407",
            "022434",
            "021444",
            "023504",
            "022505",
            "021543",
            "023611",
            "023616",
            "021638",
            "022710",
            "022753",
            "023755",
            "021858",
            "022927",
            "033019",
            "031202",
            "033304",
            "033322",
            "032400",
            "032423",
            "032430",
            "032445",
            "033480",
            "032481",
            "033503",
            "032529",
            "033538",
            "033561",
            "032577",
            "033631",
            "033636",
            "031680",
            "033704",
            "031734",
            "033738",
            "033761",
            "033833",
            "031853",
            "032895",
            "033918",
            "042050",
            "043051",
            "041079",
            "043099",
            "042102",
            "043181",
            "042214",
            "043230",
            "043271",
            "043484",
            "042531",
            "043608",
            "041609",
            "041684",
            "043747",
            "043783",
            "042886",
            "062016",
            "061061",
            "063081",
            "062082",
            "063086",
            "061098",
            "063103",
            "061109",
            "061111",
            "062165",
            "063169",
            "063316",
            "061398",
            "063433",
            "062560",
            "063576",
            "061694",
            "063781",
            "063834",
            "063981",
            "072020",
            "072108",
            "073143",
            "073177",
            "071211",
            "073250",
            "071418",
            "072508",
            "071536",
            "072562",
            "072581",
            "071604",
            "073619",
            "073635",
            "073702",
            "072790",
            "071837",
            "073887",
            "071908",
            "073922",
            "073936",
            "071980",
            "083046",
            "081075",
            "083090",
            "083097",
            "083142",
            "081153",
            "083171",
            "083178",
            "083213",
            "081285",
            "081286",
            "081405",
            "083416",
            "083441",
            "083489",
            "081491",
            "083507",
            "083580",
            "083588",
            "082593",
            "083623",
            "083624",
            "083681",
            "083689",
            "083700",
            "083739",
            "081740",
            "083768",
            "083831",
            "083935",
            "091140",
            "093146",
            "091167",
            "093176",
            "093204",
            "093239",
            "093260",
            "093263",
            "092276",
            "091297",
            "092309",
            "093402",
            "093420",
            "092422",
            "093426",
            "092541",
            "093595",
            "093607",
            "093686",
            "093687",
            "093707",
            "092749",
            "093762",
            "092778",
            "093844",
            "093848",
            "093857",
            "093911",
            "091915",
            "093921",
            "093925",
            "103005",
            "103010",
            "103052",
            "103074",
            "102145",
            "103151",
            "103152",
            "103217",
            "103218",
            "101231",
            "102232",
            "102233",
            "103236",
            "101272",
            "103280",
            "103287",
            "103288",
            "103300",
            "102301",
            "102399",
            "103403",
            "102408",
            "103421",
            "103440",
            "103475",
            "102499",
            "103545",
            "103584",
            "101598",
            "103599",
            "101743",
            "103759",
            "103846",
            "103849",
            "103893",
            "101905",
            "103924",
            "103934",
            "103946",
            "103989",
            "113077",
            "113172",
            "111179",
            "112182",
            "113216",
            "113226",
            "112249",
            "113256",
            "113265",
            "113275",
            "113291",
            "113312",
            "112410",
            "113435",
            "113495",
            "112500",
            "113592",
            "113601",
            "113729",
            "113850",
            "113892",
            "113931",
            "112992",
            "123009",
            "122069",
            "123071",
            "123072",
            "123105",
            "122139",
            "121205",
            "122208",
            "121244",
            "122290",
            "122305",
            "123317",
            "122425",
            "123436",
            "123483",
            "122494",
            "122535",
            "122563",
            "121564",
            "123578",
            "123615",
            "123620",
            "123625",
            "123626",
            "123630",
            "121678",
            "123691",
            "123697",
            "123746",
            "123748",
            "123765",
            "122777",
            "123785",
            "123791",
            "123832",
            "123859",
            "123889",
            "122977",
            "133047",
            "133148",
            "131240",
            "132241",
            "133261",
            "133273",
            "132320",
            "133498",
            "133583",
            "133614",
            "133683",
            "131698",
            "133732",
            "133742",
            "133751",
            "132758",
            "133845",
            "131851",
            "133854",
            "133890",
            "133976",
            "053035",
            "053043",
            "053060",
            "053062",
            "053065",
            "053076",
            "053170",
            "053295",
            "053318",
            "053417",
            "053438",
            "051478",
            "053736",
            "053766",
            "053771",
            "053941"
          ]
        }
      },
      {
        "code": "Puolue",
        "selection": {
          "filter": "item",
          "values": [
            "02",
            "04",
            "01",
            "05",
            "03",
            "06",
            "07",
            "08"
          ]
        }
      },
      {
        "code": "Puolueiden kannatus",
        "selection": {
          "filter": "item",
          "values": [
            "Sar2"
          ]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
  };

  //Get mun labels (one must match these to the others as they're INCONSISTENT)
  const syntD = await getQuery(munUrl);
  const munId = [];
  var i = 0;
  for(var e of syntD.variables[1].valueTexts) {
    i++; munId[e] = syntD.variables[1].values[i];
  }
  //console.log(munId);
  
  //Get data labels
  //const labels = await getQuery(url);
  //console.log(labels);
  //console.log(labels.variables[0].valueTexts);
  //console.log(labels.variables[0].values);

  /*
  const val2id = [];
  var i = 0;
  for(var e of labels.variables[0].valueTexts) {
   val2id[e] = labels.variables[0].values[i];  i++;
  }
  console.log(val2id);
  */

  //MATCH STRINGS: Find which data id's match to the original munID (aka Akaa to an ID etc)
  //https://stackoverflow.com/questions/61935692/partial-string-match-in-array
  //const val2id2 = [];
  /*
  const val2id22 = [];
  const val2id33 = [];
  for(var e of Object.keys(munId)) {
    for(var f of Object.keys(val2id)) {
      if (f.toLowerCase().includes(e.toLowerCase())) {
        //val2id2[e] = val2id[f]; 
        val2id22[e] = f;
        val2id33[f] = e;
        break;
      }
    }
  }
  console.log(val2id33);
  */

  //Get data
  const res1 = await postQuery(url,query1);
  //console.log(res1);

  //Parse values by 
  //This returns the values in order of 
  //Object.keys(res1.dimension.Alue.category.label).sort()
  //NOT as the values are printed in Alue!
  const alueIdx = Object.keys(res1.dimension.Alue.category.label).sort();
  const alue = [];
  for(var i = 0; i < alueIdx.length; i++) {
    alue.push(res1.dimension.Alue.category.label[alueIdx[i]].slice(4)); //Note: remove 4 first characters from the name!
  }
  //alue.sort();

  const vuosi = Object.values(res1.dimension.Vuosi.category.label);
  const puolue = Object.values(res1.dimension.Puolue.category.label);
  //console.log(alue)
  //console.log(vuosi)
  //console.log(puolue)
  const vals = res1.value;
  const K = alue.length;
  const I = vuosi.length;
  const J = puolue.length;
  
  const data_ = [];
  for(var k = 0; k < K; k++) { //alue
    const tab = [];
    for(var i = 0; i < I; i++) { //years
      const puolue_ = [];
      for(var j = 0; j < J; j++) { //parties
        puolue_.push(vals[J*I*k + J*i + j]);
      }
      tab[vuosi[I-i-1]] = puolue_;
    }
    //console.log(alue[k])
    data_[alue[k]] = tab;
  }
  
  //console.log(data_);

   /*
    flip rows and columns 
   */
    const data2__ = [];
    for(var i = 0; i < K; i++) { //Alue
      //const tmp = data__[area[i]];
      const tmp = JSON.parse(JSON.stringify( data_[alue[i]] ));
      let tab = [];    
      for(var j=0; j<J; j++) { //puolue
        let tmp2 = [];
        for(var k=0; k<I; k++) { //vuosi
          tmp2.push(tmp[vuosi[k]][j]);
        }
        tab[puolue[j]] = tmp2;
      }
      data2__[alue[i]] = tab;
    }

    //console.log(data2__)


  /*
  val2id33 = [];
  for(var e of Object.keys(munId)) {
    for(var f of alue) {
      if (f.toLowerCase().includes(e.toLowerCase())) {
        //val2id2[e] = val2id[f]; 
        //val2id22[e] = f;
        val2id33[f] = e;
        break;
      }
    }
  }
  */


  //FINALLY PARSE TO MATCH MUNICIPALITY DATA NAMES
  /*
  const data__ = [];
  const keys__ = Object.keys(val2id33);
  const values__ = Object.values(val2id33);
  for(var i = 0; i < keys__.length; i++) {
    data__[values__[i]] = data_[keys__[i]];
  }
  */


  /*
  OSA 2:
  munID vastaavuuden tarkastus
  */

  /*
  munIDKeys__ = Object.keys(munId); //Remember to ignore WHOLE COUNTRY
  dataKeys__ = Object.keys(data__);
  for(var i = 0; i <dataKeys__.length; i++) {
    console.log("MunID: "+munIDKeys__[i+1]+ ", data__: " +dataKeys__[i]);
  }
  */

  //console.log(data__);
  //return data__;
  //return data_;

  return {"Data1":data_,"Data2":data2__};
}
module.exports.puoluekann = puoluekann;

//const pk = puoluekann().then();

//console.log(pk);