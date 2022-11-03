
import {getQuery, postQuery} from "./data_tools.js"

/*
115b -- Population by area, main type of activity, sex, age and year, 1987-2020
https://pxweb2.stat.fi/PxWeb/pxweb/en/StatFin/StatFin__tyokay/statfin_tyokay_pxt_115b.px/table/tableViewLayout1/
*/


async function tyollisyys() {
    const url = "https://pxweb2.stat.fi:443/PxWeb/api/v1/en/StatFin/tyokay/statfin_tyokay_pxt_115b.px";
    const munUrl = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";

    let query1 = {
        "query": [
          {
            "code": "Alue",
            "selection": {
              "filter": "item",
              "values": [
                "KU020",
                "KU005",
                "KU009",
                "KU010",
                "KU016",
                "KU018",
                "KU019",
                "KU035",
                "KU043",
                "KU046",
                "KU047",
                "KU049",
                "KU050",
                "KU051",
                "KU052",
                "KU060",
                "KU061",
                "KU062",
                "KU065",
                "KU069",
                "KU071",
                "KU072",
                "KU074",
                "KU075",
                "KU076",
                "KU077",
                "KU078",
                "KU079",
                "KU081",
                "KU082",
                "KU086",
                "KU111",
                "KU090",
                "KU091",
                "KU097",
                "KU098",
                "KU102",
                "KU103",
                "KU105",
                "KU106",
                "KU108",
                "KU109",
                "KU139",
                "KU140",
                "KU142",
                "KU143",
                "KU145",
                "KU146",
                "KU153",
                "KU148",
                "KU149",
                "KU151",
                "KU152",
                "KU165",
                "KU167",
                "KU169",
                "KU170",
                "KU171",
                "KU172",
                "KU176",
                "KU177",
                "KU178",
                "KU179",
                "KU181",
                "KU182",
                "KU186",
                "KU202",
                "KU204",
                "KU205",
                "KU208",
                "KU211",
                "KU213",
                "KU214",
                "KU216",
                "KU217",
                "KU218",
                "KU224",
                "KU226",
                "KU230",
                "KU231",
                "KU232",
                "KU233",
                "KU235",
                "KU236",
                "KU239",
                "KU240",
                "KU320",
                "KU241",
                "KU322",
                "KU244",
                "KU245",
                "KU249",
                "KU250",
                "KU256",
                "KU257",
                "KU260",
                "KU261",
                "KU263",
                "KU265",
                "KU271",
                "KU272",
                "KU273",
                "KU275",
                "KU276",
                "KU280",
                "KU284",
                "KU285",
                "KU286",
                "KU287",
                "KU288",
                "KU290",
                "KU291",
                "KU295",
                "KU297",
                "KU300",
                "KU301",
                "KU304",
                "KU305",
                "KU312",
                "KU316",
                "KU317",
                "KU318",
                "KU398",
                "KU399",
                "KU400",
                "KU407",
                "KU402",
                "KU403",
                "KU405",
                "KU408",
                "KU410",
                "KU416",
                "KU417",
                "KU418",
                "KU420",
                "KU421",
                "KU422",
                "KU423",
                "KU425",
                "KU426",
                "KU444",
                "KU430",
                "KU433",
                "KU434",
                "KU435",
                "KU436",
                "KU438",
                "KU440",
                "KU441",
                "KU475",
                "KU478",
                "KU480",
                "KU481",
                "KU483",
                "KU484",
                "KU489",
                "KU491",
                "KU494",
                "KU495",
                "KU498",
                "KU499",
                "KU500",
                "KU503",
                "KU504",
                "KU505",
                "KU508",
                "KU507",
                "KU529",
                "KU531",
                "KU535",
                "KU536",
                "KU538",
                "KU541",
                "KU543",
                "KU545",
                "KU560",
                "KU561",
                "KU562",
                "KU563",
                "KU564",
                "KU309",
                "KU576",
                "KU577",
                "KU578",
                "KU445",
                "KU580",
                "KU581",
                "KU599",
                "KU583",
                "KU854",
                "KU584",
                "KU588",
                "KU592",
                "KU593",
                "KU595",
                "KU598",
                "KU601",
                "KU604",
                "KU607",
                "KU608",
                "KU609",
                "KU611",
                "KU638",
                "KU614",
                "KU615",
                "KU616",
                "KU619",
                "KU620",
                "KU623",
                "KU624",
                "KU625",
                "KU626",
                "KU630",
                "KU631",
                "KU635",
                "KU636",
                "KU678",
                "KU710",
                "KU680",
                "KU681",
                "KU683",
                "KU684",
                "KU686",
                "KU687",
                "KU689",
                "KU691",
                "KU694",
                "KU697",
                "KU698",
                "KU700",
                "KU702",
                "KU704",
                "KU707",
                "KU729",
                "KU732",
                "KU734",
                "KU736",
                "KU790",
                "KU738",
                "KU739",
                "KU740",
                "KU742",
                "KU743",
                "KU746",
                "KU747",
                "KU748",
                "KU791",
                "KU749",
                "KU751",
                "KU753",
                "KU755",
                "KU758",
                "KU759",
                "KU761",
                "KU762",
                "KU765",
                "KU766",
                "KU768",
                "KU771",
                "KU777",
                "KU778",
                "KU781",
                "KU783",
                "KU831",
                "KU832",
                "KU833",
                "KU834",
                "KU837",
                "KU844",
                "KU845",
                "KU846",
                "KU848",
                "KU849",
                "KU850",
                "KU851",
                "KU853",
                "KU857",
                "KU858",
                "KU859",
                "KU886",
                "KU887",
                "KU889",
                "KU890",
                "KU892",
                "KU893",
                "KU895",
                "KU785",
                "KU905",
                "KU908",
                "KU092",
                "KU915",
                "KU918",
                "KU921",
                "KU922",
                "KU924",
                "KU925",
                "KU927",
                "KU931",
                "KU934",
                "KU935",
                "KU936",
                "KU941",
                "KU946",
                "KU976",
                "KU977",
                "KU980",
                "KU981",
                "KU989",
                "KU992"
              ]
            }
          },
          {
            "code": "Pääasiallinen toiminta",
            "selection": {
              "filter": "item",
              "values": [
                "SSS",
                "11+12",
                "11",
                "12",
                "21-99",
                "21",
                "22",
                "25",
                "24+29",
                "99"
              ]
            }
          },
          {
            "code": "Sukupuoli",
            "selection": {
              "filter": "item",
              "values": [
                "SSS"
              ]
            }
          },
          {
            "code": "Ikä",
            "selection": {
              "filter": "item",
              "values": [
                "SSS"
              ]
            }
          }
        ],
        "response": {
          "format": "json-stat2"
        }
      };


    //Get data
    const res1 = await postQuery(url,query1);
    //console.log(res1);

    const toim = Object.values(res1.dimension["Pääasiallinen toiminta"].category.label);
    const year = Object.values(res1.dimension.Vuosi.category.label);
    const area = Object.values(res1.dimension.Alue.category.label);
    const vals = res1.value;
    
 
    const K = toim.length; //10
    const J = year.length; //34
    const I = area.length; //309

    /*
    console.log(vals[10*34*0 + 1 + 34*1])
    console.log(vals[10*34*1 + 1 + 34*1])
    console.log(vals[10*34*2 + 1 + 34*1])
    */

    
    const data__ = [];
    for(var i = 0; i < I; i++) { //alue
        let tab = [];
        for(var j = 0; j < J; j++) { //year
            let toim_ = [];
            for(var k = 0; k < K; k++) { //toim
                toim_.push(vals[J*K*i + J*k + j]);
            }
            tab[year[j]] = toim_;
        }
        data__[area[i]] = tab;
    }


    //console.log(data__)

    /*
    flip rows and columns 
   */
    const data2__ = [];
    for(var i = 0; i < I; i++) { //Alue
      //const tmp = data__[area[i]];
      const tmp = JSON.parse(JSON.stringify( data__[area[i]] ));
      let tab = [];    
      for(var j=0; j<K; j++) { //toim
        let tmp2 = [];
        for(var k=0; k<J; k++) { //vuosi
          tmp2.push(tmp[year[k]][j]);
        }
        tab[toim[j]] = tmp2;
      }
      data2__[area[i]] = tab;
    }

    //return data__;
    return {"Data1":data__, "Data2":data2__};
}

module.exports.tyollisyys = tyollisyys;

//const ty = tyollisyys().then();
//console.log(ty);