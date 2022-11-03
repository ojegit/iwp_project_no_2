
import {getQuery, postQuery, summaryStats} from "./data_tools.js"

/*
'Population aged 15 or over by level of education, municipality, gender and age, 1970-2020
https://pxweb2.stat.fi/PxWeb/pxweb/en/StatFin/StatFin__vkour/statfin_vkour_pxt_12bq.px/table/tableViewLayout1/
*/

async function koulutustaso() {
    const munUrl = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
    const url = 'https://pxweb2.stat.fi:443/PxWeb/api/v1/en/StatFin/vkour/statfin_vkour_pxt_12bq.px';    
    
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
            "code": "Sukupuoli",
            "selection": {
              "filter": "item",
              "values": [
                "SSS"
              ]
            }
          },
          {
            "code": "Koulutusaste",
            "selection": {
              "filter": "item",
              "values": [
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9"
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


   //Get data
   const res1 = await postQuery(url,query1);
   //console.log(res1);


   
   const educLvl = Object.values(res1.dimension.Koulutusaste.category.label);
   const year = Object.values(res1.dimension.Vuosi.category.label);
   const area = Object.values(res1.dimension.Alue.category.label);
   const vals = res1.value; //2472 values, [1 years, 8 educ groups, 309 areas = 2472!]
   
   //console.log(vals)

   const K = educLvl.length;
   const J = year.length;
   const I = area.length;

    /*
    const data__ = [];
    for(var k = 0; k < K; k++) { //year
        let area = [];
        for(var i = 0; i < I; i++) { //area
            let educ = [];
            for(var j = 0; j < J; j++) { //educ lvl
                puolue_.push(vals[J*I*k + J*i + j]);
                data__[area[i]] = 
            }
        }
    }
    */
    const data__ = [];
    for(var i = 0; i < I; i++) { //alue
        let tab = [];
        for(var j = 0; j < J; j++) { //year
            let educ_ = [];
            for(var k = 0; k < K; k++) { //educ
                educ_.push(vals[k + i*K + K*I*j]);
            }
            tab[year[j]] = educ_;
        }
        data__[area[i]] = tab;
    }


    /*
    flip rows and columns 
    */
    const data2__ = [];
    for(var i = 0; i < I; i++) {
      //const tmp = data__[area[i]];
      const tmp = JSON.parse(JSON.stringify( data__[area[i]] ));
      let tab = [];    
      for(var j=0; j<K; j++) {
        let tmp2 = [];
        for(var k=0; k<J; k++) {
          tmp2.push(tmp[year[k]][j]);
        }
        tab[educLvl[j]] = tmp2;
      }
      data2__[area[i]] = tab;
    }
    //console.log(data2__);

    //console.log(data__);

    /*
    console.log(vals[0 + 7*309*0])
    console.log(vals[0 + 7*309*1])
    console.log(vals[0 + 7*309*2])
    */

    /*
    console.log(vals[1*7 + 7*309*0])
    console.log(vals[1*7 + 7*309*1])
    console.log(vals[1*7 + 7*309*2])
    */

    /*
    console.log(vals[2 + 1*7 + 7*309*0])
    console.log(vals[2 + 1*7 + 7*309*1])
    console.log(vals[2 + 1*7 + 7*309*2])
    */

   /*
   function parseAll(area,values,educLvl) {
      const data = [];
      for(var i = 0; i < 309; i++) {
        let educLvlVal = [];
        for(var j = 0; j < 8; j++) {
          educLvlVal.push(values[8*i + j]);
          data[area[i]] = {name: educLvl, values: educLvlVal};
        }
      }
      return data;
    }

    const educData = parseAll(area,values,educLvl);
    console.log(educData);
    */
    
    //return data__;


    /*
    Descriptives measure (as whole, per municipality, per year)
    */
    
    /*
    console.log(data__)
    console.log(data2__)
    console.log(summaryStats(data__));
    console.log(summaryStats(data2__));
    */

    return {"Data1":data__, "Data2":data2__};

}

module.exports.koulutustaso = koulutustaso;

//const kt = koulutustaso().then();
//console.log(kt);