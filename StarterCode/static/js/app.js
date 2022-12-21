const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

const dataPromise = d3.json(url)
console.log("Data Promise: ", dataPromise);

d3.json(url).then(function(data) {

    console.log(data.names)

    let names = data.names

    let metadata = data.metadata

    let samples = data.samples

    
    
     

    console.log(samples[0])
    console.log(names[0])
    console.log(metadata[0])
    

    for (let i = 0; i < names.length; i++) {
        d3.select("select").append("option").text(names[i])
        
    }



    let demoKeys = Object.keys(metadata[0]);
    let demoVals = Object.values(metadata[0])

    console.log(demoKeys)

    for (let j = 0; j<demoKeys.length;j++){
        d3.select(".panel-body").append("h5").text(demoKeys[j] + ": " + demoVals[j]);


    }



    
    
    

    // function.init() {
    //     d3.select("select").text(940);
    //     d3.select(".").append("h6").text("age:")
    // }

    

    

    // function init() {
        
        let samplesInit = samples[0].sample_values;
        let otuIdsInit = samples[0].otu_ids;
        let otuLabelsInit = samples[0].otu_labels;
        
       
        // topSamplesInit = samplesInit.slice(0,10).reverse();
        // topOtuIdsInit = otuIdsInit.slice(0, 10).reverse();
        // topOtuLabelsInit = otuLabelsInit.slice(0, 10).reverse();

        


        let traceInit = {
            x: samplesInit.slice(0,10).reverse(),
            y: otuIdsInit.slice(0, 10).reverse(),
            text: otuLabelsInit.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"

        };

        let traceDataInit = [traceInit];

        let layout = {
            title: "Top Ten OTUs",
            
        };
    // };

    Plotly.newPlot("bar", traceDataInit, layout)
    
    

    
});