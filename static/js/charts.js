// initialize dashboard
function init() {
  var selector = d3.select("#selDataset");
  d3.json("Output.json").then((data) => {
    var xrayNames = data.index;
    xrayNames.forEach((xray) => {
      selector
        .append("option")
        .text(xray)
        .property("value", xray);
    });
    var firstXray = xrayNames[0];
    buildCharts(firstXray);
    buildMetadata(firstXray);
  });
}

// build new data for a newly selected xray
function optionChanged(newXray) {
  buildMetadata(newXray);
  buildCharts(newXray);
}

// build demographics panel
function buildMetadata(xray) {
  d3.json("Output.json").then((data) => {
    var metadata = data.metadata;
    console.log(metadata)
    var resultArray = metadata.filter(sampleObj => sampleObj.id == xray);
    console.log(resultArray)
    var result = resultArray[0];
    console.log(result)
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}




// Deliverable 3: Create a Gauge Chart
// 1. Create a variable that filters the metadata array for the object with the desired sample number.
var metadata = data.metadata;

    // 2. Create a variable that holds the first sample in the metadata array.
    var gaugeArray = metadata.filter(metadataObj => metadataObj.id == xray);
    var gaugeResult = gaugeArray[0];

    // 3. Create a variable that holds the washing frequency.
    var washFrequency = gaugeResult.wfreq;
    
    // 4. Create the trace for the gauge chart.
    var gaugeTrace = [
    {
      title: { text: "<b>Triage Level" },
      value: parseFloat(washFrequency),
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 4], tickwidth: 1, tickcolor: "black" },
        bar: { color: "black" },
        steps: [
          { range: [0, 1], color: "red" },
          { range: [1,2], color: "orange" },
          { range: [2,3], color: "yellow" },
          { range: [3,4], color: "lightgreen" }
        ]}}];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500, 
      height: 425, 
      margin: { t: 0, b: 0 }, 
      paper_bgcolor: '#cdf6d2',
      plot_bgcolor: '#cdf6d2',
    };
    
    // 6. Use Plotly to plot the gauge data and layout.
Plotly.newPlot("gauge", gaugeTrace, gaugeLayout); 

init();