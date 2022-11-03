
import {getQuery, postQuery} from "./data_tools.js"


/*
 Veronalaiset tulot / 11i8 -- Yleisesti verovelvollisten tulonsaajien luku, tulot ja verot kunnittain, 2005-2018
"https://statfin.stat.fi/PxWeb/pxweb/fi/StatFin/StatFin__tvt/statfin_tvt_pxt_11i8.px/table/tableViewLayout1/"

Tässä on taas kerran kunnat hieman eri järjestyksessä ja mm. Maarianhamina suomenkielisellä nimellä, kun muissa se 
voi olla Mariehamn jne!
*/



async function tulotaso() {
    const munUrl = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
    const url = 'https://statfin.stat.fi:443/PxWeb/api/v1/fi/StatFin/tvt/statfin_tvt_pxt_11i8.px';
  
    let query1 = {
        "query": [
          {
            "code": "Kunta",
            "selection": {
              "filter": "item",
              "values": [
                "020",
                "005",
                "009",
                "010",
                "016",
                "018",
                "019",
                "035",
                "043",
                "046",
                "047",
                "049",
                "050",
                "051",
                "052",
                "060",
                "061",
                "062",
                "065",
                "069",
                "071",
                "072",
                "074",
                "075",
                "076",
                "077",
                "078",
                "079",
                "081",
                "082",
                "086",
                "111",
                "090",
                "091",
                "097",
                "098",
                "099",
                "102",
                "103",
                "105",
                "106",
                "108",
                "109",
                "139",
                "140",
                "142",
                "143",
                "145",
                "146",
                "153",
                "148",
                "149",
                "151",
                "152",
                "165",
                "167",
                "169",
                "170",
                "171",
                "172",
                "176",
                "177",
                "178",
                "179",
                "181",
                "182",
                "186",
                "202",
                "204",
                "205",
                "208",
                "211",
                "213",
                "214",
                "216",
                "217",
                "218",
                "224",
                "226",
                "230",
                "231",
                "232",
                "233",
                "235",
                "236",
                "239",
                "240",
                "320",
                "241",
                "322",
                "244",
                "245",
                "249",
                "250",
                "256",
                "257",
                "260",
                "261",
                "263",
                "265",
                "271",
                "272",
                "273",
                "275",
                "276",
                "280",
                "284",
                "285",
                "286",
                "287",
                "288",
                "290",
                "291",
                "295",
                "297",
                "300",
                "301",
                "304",
                "305",
                "312",
                "316",
                "317",
                "318",
                "398",
                "399",
                "400",
                "407",
                "402",
                "403",
                "405",
                "408",
                "410",
                "416",
                "417",
                "418",
                "420",
                "421",
                "422",
                "423",
                "425",
                "426",
                "444",
                "430",
                "433",
                "434",
                "435",
                "436",
                "438",
                "440",
                "441",
                "475",
                "478",
                "480",
                "481",
                "483",
                "484",
                "489",
                "491",
                "494",
                "495",
                "498",
                "499",
                "500",
                "503",
                "504",
                "505",
                "508",
                "507",
                "529",
                "531",
                "535",
                "536",
                "538",
                "541",
                "543",
                "545",
                "560",
                "561",
                "562",
                "563",
                "564",
                "309",
                "576",
                "577",
                "578",
                "445",
                "580",
                "581",
                "599",
                "583",
                "854",
                "584",
                "588",
                "592",
                "593",
                "595",
                "598",
                "601",
                "604",
                "607",
                "608",
                "609",
                "611",
                "638",
                "614",
                "615",
                "616",
                "619",
                "620",
                "623",
                "624",
                "625",
                "626",
                "630",
                "631",
                "635",
                "636",
                "678",
                "710",
                "680",
                "681",
                "683",
                "684",
                "686",
                "687",
                "689",
                "691",
                "694",
                "697",
                "698",
                "700",
                "702",
                "704",
                "707",
                "729",
                "732",
                "734",
                "736",
                "790",
                "738",
                "739",
                "740",
                "742",
                "743",
                "746",
                "747",
                "748",
                "791",
                "749",
                "751",
                "753",
                "755",
                "758",
                "759",
                "761",
                "762",
                "765",
                "766",
                "768",
                "771",
                "777",
                "778",
                "781",
                "783",
                "831",
                "832",
                "833",
                "834",
                "837",
                "844",
                "845",
                "846",
                "848",
                "849",
                "850",
                "851",
                "853",
                "857",
                "858",
                "859",
                "886",
                "887",
                "889",
                "890",
                "892",
                "893",
                "895",
                "785",
                "905",
                "908",
                "911",
                "092",
                "915",
                "918",
                "921",
                "922",
                "924",
                "925",
                "927",
                "931",
                "934",
                "935",
                "936",
                "941",
                "946",
                "976",
                "977",
                "980",
                "981",
                "989",
                "992"
              ]
            }
          }
        ],
        "response": {
          "format": "json-stat2"
        }
      };


    const syntD = await getQuery(munUrl);
    const munId = [];
    var i = 0;
    for(var e of syntD.variables[1].valueTexts) {
        i++; munId[e] = syntD.variables[1].values[i];
    }
    //console.log(munId);


    
    //Get data
    const res1 = await postQuery(url,query1);
    //console.log(res1);


    //console.log(kunta);
    //console.log(res1.value);


    const tied = Object.values(res1.dimension.Tiedot.category.label);
    const year = Object.values(res1.dimension.Vuosi.category.label);
    const area = Object.values(res1.dimension.Kunta.category.label).sort(); //It turns out the VALUES are based on Alphabetical order of the kunta/area, BUT these ARE NOT in Alphabetical BY DEFAULT!
    const vals = res1.value; 

    //console.log(tied)
    

    const K = tied.length; //311
    const J = year.length; //14
    const I = area.length; //11

    /*
    console.log(res1.value[0 + 11*0 + 11*311*0]); //
    console.log(res1.value[0 + 11*0 + 11*311*1]);
    console.log(res1.value[0 + 11*0 + 11*311*2]);
    */

    
    const data__ = [];
    for(var i = 0; i < I; i++) { //alue/kunta
        let tab = [];
        for(var j = 0; j < J; j++) { //year
            let tied_ = [];
            for(var k = 0; k < K; k++) { //tied
                tied_.push(vals[k + i*K + K*I*j]);
            }
            tab[year[j]] = tied_;
        }
        data__[area[i]] = tab;
    }

  /*
    flip rows and columns 
   */
    const data2__ = [];
    for(var i = 0; i < I; i++) { //Alue
      //const tmp = data__[area[i]];
      const tmp = JSON.parse(JSON.stringify( data__[area[i]] ));
      let tab = [];    
      for(var j=0; j<K; j++) { //tiedot
        let tmp2 = [];
        for(var k=0; k<J; k++) { //vuosi
          tmp2.push(tmp[year[k]][j]);
        }
        tab[tied[j]] = tmp2;
      }
      data2__[area[i]] = tab;
    }

    //console.log(data2__);
    //console.log(data__);
    //return data__;

    return {"Data1":data__, "Data2":data2__}
}

module.exports.tulotaso = tulotaso;

//const tt = tulotaso().then();
//console.log(tt);