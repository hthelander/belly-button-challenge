const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"



function buildCharts(id) {

    d3.json(url).then(function (data) {
        // console.log(data.names)
        const names = data.names
        const metadata = data.metadata
        const samples = data.samples

        console.log(samples[0])
        console.log(names[0])
        console.log(metadata[0])


        for (let i = 0; i < names.length; i++) {
            d3.select("select").append("option").text(names[i])
        }


        d3.select("select").append("option").text(names[0]);

        let metadatum = metadata.filter(sample => sample.id == id)[0]
        console.log(metadatum)


        let metaKeys = Object.keys(metadatum);
        let metaVals = Object.values(metadatum);


        console.log(metaKeys);
        let metadataBox = d3.select(".panel-body")
        metadataBox.html("")

        for (let j = 0; j < metaKeys.length; j++) {
            metadataBox.append("h5").text(metaKeys[j] + ": " + metaVals[j]);
        }

        let sample = samples.filter(sample => sample.id == id)[0]
        console.log(sample)

        let sampleVals = sample.sample_values;
        let sampleIds = sample.otu_ids;
        let sampleLabels = sample.otu_labels;

        let topSamples = sampleVals.slice(0, 10).reverse();
        let topIds = sampleIds.slice(0, 10).reverse();
        let topLabels = sampleLabels.slice(0, 10).reverse();

        console.log(topSamples)


        let traceBar = {
            x: topSamples.map(object => object),
            y: topIds.map(object => `OTU ${object}`),
            text: topLabels.map(object => object),
            type: "bar",
            orientation: "h"
        };

        let traceBarData = [traceBar];

        let layoutBar = {
            title: "Top Ten OTUs",

        };

        Plotly.newPlot("bar", traceBarData, layoutBar)


        let traceBubble = {
            x: sampleIds,
            y: sampleVals,
            text: sampleLabels,
            mode: 'markers',
            marker: {
                size: sampleVals,
                color: sampleIds
            }
        };

        let traceBubbleData = [traceBubble];

        let layoutBubble = {
            title: 'OTU Values',
            showlegend: false,
            height: 600,
            width: 1500
        };

        Plotly.newPlot("bubble", traceBubbleData, layoutBubble);


        let traceGauge = [
            {
                type: "indicator",
                mode: "gauge+number",
                value: metadatum.wfreq,
                title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
                number: metaVals[7],
                gauge: {
                    axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "green" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                        { range: [0, 1], color: "8601" },
                        { range: [1, 2], color: "8612" },
                        { range: [2, 3], color: "8623" },
                        { range: [3, 4], color: "8634" },
                        { range: [4, 5], color: "8645" },
                        { range: [5, 6], color: "8656" },
                        { range: [6, 7], color: "8667" },
                        { range: [7, 8], color: "8678" },
                        { range: [8, 9], color: "8689" }
                    ],

                }
            }
        ];

        let layoutGauge = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },

            font: { color: "black", family: "Arial" }
        };

        Plotly.newPlot('gauge', traceGauge, layoutGauge);
    });
}

// function optionChanged(id) {
//     console.log(id)
//     buildCharts(id)
// }

buildCharts(940);