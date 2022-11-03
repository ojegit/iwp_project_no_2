import { Chart } from "../node_modules/frappe-charts/dist/frappe-charts.min.esm"

function overallChart(data,chartType,dataSelId,layerName) {
    var aggTypeSelector = document.querySelectorAll('input[name=agg-radio-button]');
    //console.log(aggTypeSelector);

    const noCut = 10; //how many character to keep on the labels?
    let aggMethod;
    let buttonVal;
    let overallChart;
    let chartData;


    function drawChart(buttonVal) {
        if(buttonVal==='mean') {
            aggMethod = 2;
        } else if(buttonVal==='std') {
            aggMethod = 3;
        } else if(buttonVal==='median') {
            aggMethod = 4;
        }

        //draw chart
        const datasets = [];
        let i = 0;
        for(var e of data[dataSelId][0]["labels"]) {
            datasets.push(data[dataSelId][0]["overallSS"][i][aggMethod]);
            i++;
        }

        let shortLab = [];
        for(var a of data[dataSelId][0]["labels"]) {
            shortLab.push(a.substring(0,noCut));
        }

        chartData =  {
            labels: shortLab,
            datasets: [{values: datasets}]
        };
        //console.log(chartData)

        overallChart = new Chart("#overall-chart", { //new frappe.Chart("#data-chart-"+layer.feature.properties.name, {
        title: buttonVal+" of "+dataSelId+", overall",
        data: chartData,
        color: 'orange',
        type: chartType,
        height: 200,
        width: 200,
        barOptions: {
            spaceRatio: 0.3
        }
        })
    }

    //Initialize
    for (const radio of aggTypeSelector) {
        if(radio.checked) {
            drawChart(radio.value);
        }
    }

    //Listen changes after...
    for (const radio of aggTypeSelector) {
        radio.onclick = (e) => {
            //reag aggregation method from the button
            buttonVal = e.target.value;
            //console.log(buttonVal)
            drawChart(buttonVal);
        }
    }

    //Export-chart functionality
    document.getElementById("overall-chart-export").addEventListener("click",()=>{
        overallChart.export();
    });

}

module.exports.overallChart = overallChart;

/*
function overallChart(data,chartType,dataSelId,layerName) {
    const avgType = 2;
    const noCut = 10;
    
    //var idx = data[dataSelId][0]["labels"].findIndex(object => {return object === layerName;});

    const datasets = [];
    let i = 0;
    for(var e of data[dataSelId][0]["labels"]) {
        datasets.push(data[dataSelId][0]["overallSS"][i][avgType]);
        i++;
    }

    let shortLab = [];
    for(var a of data[dataSelId][0]["labels"]) {
        shortLab.push(a.substring(0,noCut));
    }
    
    let overallChart;
    const chartData =  {
        labels: shortLab,
        datasets: [{values: datasets}]
    };
    console.log(chartData)

    overallChart = new Chart("#overall-chart", { //new frappe.Chart("#data-chart-"+layer.feature.properties.name, {
    title: dataSelId+", overall",
    data: chartData,
    type: chartType,
    height: 200,
    width: 200,
    //lineOptions: {
    //    hideDots: 1,
    //    regionFill: 0
    //}
    //barOptions: {
    //    stacked: 1    // default 0, i.e. adjacent
    //}
    })
    
    //Export-chart functionality
    document.getElementById("overall-chart-export").addEventListener("click",()=>{
        overallChart.export();
    });
    
}
*/


/*

import { Chart } from "../node_modules/frappe-charts/dist/frappe-charts.min.esm"

//Handle update of aggregate chart as well as the calculations
function updateAggChart(data) { //inputs 
    const area = Object.keys(data)
    const educLvl = data[area[0]].name;

    //Explanation of inputs
    //area    ? munipality labels/names
    //data    ? the data that is being aggregated aka data by municipality such that 'data[area[i]].values' accesses 
    //          the values of area[i]

    //Choose aggregation method
    var aggTypeSelector = document.querySelectorAll('input[name=agg-radio-button]');
    var chartTypeSelector = document.querySelectorAll('input[name=selector-radio-button]');
    var radioSelector = document.querySelectorAll('input[name=selector-radio-button],input[name=agg-radio-button]');

    //Monitor ALL buttons 
    //Add event lister to the radiobutton (https://thewebdev.info/2022/02/12/how-to-attach-event-listener-to-a-radio-button-with-javascript/#:~:text=button%20with%20JavaScript%3F-,To%20attach%20event%20listener%20to%20a%20radio%20button%20with%20JavaScript,and%20set%20its%20onclick%20property.&text=to%20add%20a%20form%20with%20radio%20buttons.&text=to%20select%20the%20radio%20buttons,with%20a%20for-of%20loop.)
    for (const radio of radioSelector) { 
        radio.onclick = (e) => {
            const value = e.target.value;
            let type;
            let agg;

            //If type activation detected, then find the currently activated agg button
            //If agg activation detected, then find the currently activated type button
            if(value==='pie' || value==='line' || value==='bar') {
                type = value;
                for(var at of aggTypeSelector) { 
                    if(at.checked) { 
                        agg = at.value; 
                        break; 
                    }
                }

            } else if(value==='sum' || value==='mean' || value=='median') {
                agg = value;
                for(var ct of chartTypeSelector) { 
                    if(ct.checked) { 
                        type = ct.value; 
                        break; 
                    } 
                }
            }

            let sum = [];
            for(var i = 0; i < educLvl.length; i++) {
                sum.push(0.0);
            }
            
            if(agg === 'sum' || agg === 'mean') {
                for(var i = 0; i < area.length; i++) { //for each municipality
                    for(var j = 0; j < educLvl.length; j++) {
                        sum[j] += data[area[i]].values[j];
                    }
            }

            if(agg === 'mean') {
                for(var i = 0; i < educLvl.length; i++) {
                    sum[i] /= (area.length*1.0);
                }
            }

            } else if (agg==='median') {

                //Median:
                //1. sort 
                //2. get vector length n. 
                //3. if length is odd then median is n:th value, if length is even 
                //then median is the average of n:th and n+1:th values

                for(var j = 0; j < educLvl.length; j++) { //for each educLvl
                    var tmp = [];
                    for(var i = 0; i < area.length; i++) { //collect all data from a municipality
                        tmp.push(data[area[i]].values[j]);
                    }
                    var n = tmp.length;
                    tmp.sort();
                    if(n % 2 == 0) {//EVEN
                        sum[j] =  tmp[n/2-1] + tmp[n/2+1-1];
                    } else { //ODD
                        sum[j] = tmp[(n+1)/2-1];
                    }

                }

            }
        
            const chartData = { labels: educLvl, datasets: [{values: sum}] };

            //Initialize the chart
            var pieChart = new Chart("#chart1-area", { //var pieChart = new frappe.Chart("#chart1-area", {
                data: chartData,
                title: agg.toUpperCase()+ " Education Level",
                type: type,
                //colors: ["#2947ff", "#f44336", "#aeff62", "#e91e63", "#9c27b0", "#141021"],
                height: 300,
                width: 200,
                maxSlices: 10
            });

        }

    }
}

module.exports.updateAggChart = updateAggChart;

*/