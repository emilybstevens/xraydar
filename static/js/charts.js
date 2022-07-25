function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    // console.log("selected")
    // Use the list of sample names to populate the select options
    d3.json("../json/xray_data.json").then((dataset) => {
      var sampleNames = dataset.names;
      // console.log(sampleNames[0])
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard

  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("../json/xray_data.json").then((data) => {
      var metadata = data.metadata;
      var all_dx = data.all_dx;
      // console.log(metadata);

      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.xray_number == sample);
      var result = resultArray[0];

      var resultArrayTwo = all_dx.filter(sampleObj => sampleObj.xray_number == sample);
      var resultTwo = resultArrayTwo[0];
      // console.log(result)
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
      var panelAll = d3.select("#all-dx");
      // console.log(PANEL)
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
      panelAll.html("");

      // define all_dx panels
      // 1
      if (resultTwo.dx1 === null) {
        var dx1 = "";
      } else if (typeof resultTwo.dx_1 === "string") {
        var dx1 = resultTwo.dx_1
      }
      // 2
      if (resultTwo.dx_2 === null) {
        var dx2 = "";
      } else if (typeof resultTwo.dx_2 === "string") {
        var dx2 = resultTwo.dx_2;
      }
      // 3
      if (resultTwo.dx_3 === null) {
        var dx3 = "";
      } else if (typeof resultTwo.dx_3 === "string") {
        var dx3 = resultTwo.dx_3;
      }
      // 4
      if (resultTwo.dx_4 === null) {
        var dx4 = "";
      } else if (typeof resultTwo.dx_4 === "string") {
        var dx4 = resultTwo.dx_4;
      }
      // 5
      if (resultTwo.dx_5 === null) {
        var dx5 = "";
      } else if (typeof resultTwo.dx_5 === "string") {
        var dx5 = resultTwo.dx_5;
      }
      // 6
      if (resultTwo.dx_6 === null) {
        var dx6 = "";
      } else if (typeof resultTwo.dx_6 === "string") {
        var dx6 = resultTwo.dx_6;
      }
      // 7
      if (resultTwo.dx_7 === null) {
        var dx7 = "";
      } else if (typeof resultTwo.dx_7 === "string") {
        var dx7 = resultTwo.dx_7;
      }
      // 8
      if (resultTwo.dx_8 === null) {
        var dx8 = "";
      } else if (typeof resultTwo.dx_8 === "string") {
        var dx8 = resultTwo.dx_8;
      }
      // 9
      if (resultTwo.dx_9 === null) {
        var dx9 = "";
      } else if (typeof resultTwo.dx_9 === "string") {
        var dx9 = resultTwo.dx_9;
      }

      // Edit the keys to capture more detailed information and print each value
      PANEL.append("h6").text(`X-Ray Number: ${result.xray_number}`);
      PANEL.append("h6").text(`Triage: ${result.highest_class}`);
      PANEL.append("h6").text(`Highest Triage Diagnosis: ${result.highest_dx}`);
      PANEL.append("h6").text(`Image ID: ${result.image_index}`);
      PANEL.append("h6").text(`Patient ID: ${result.patient_id}`);
      PANEL.append("h6").text(`Gender: ${result.gender}`);
      PANEL.append("h6").text(`Age: ${result.age}`);
      PANEL.append("h6").text(`View Position: ${result.view_position}`);
      
      
      // all dx panel
      panelAll.append("h6").text(`${dx1}`);
      panelAll.append("h6").text(`${dx2}`);
      panelAll.append("h6").text(`${dx3}`);
      panelAll.append("h6").text(`${dx4}`);
      panelAll.append("h6").text(`${dx5}`);
      panelAll.append("h6").text(`${dx6}`);
      panelAll.append("h6").text(`${dx7}`);
      panelAll.append("h6").text(`${dx8}`);
      panelAll.append("h6").text(`${dx9}`);

    });
  }
  
  // 1. Create the buildCharts function.
  function buildCharts(sample) {
    // console.log("begun")
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("../json/xray_data.json").then((data) => {

    // Deliverable 3: Create a Gauge Chart
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    // console.log(metadata)
    // 2. Create a variable that holds the first sample in the metadata array.
    var gaugeArray = metadata.filter(metadataObj => metadataObj.xray_number == sample);
    var gaugeResult = gaugeArray[0];

    // 3. Create a variable that holds the washing frequency.
    var hiLabel = gaugeResult.highest_label;
    
    // 4. Create the trace for the gauge chart.
    var gaugeTrace = [
    {
      title: { text: "<b>Triage Level" },
      value: parseFloat(hiLabel),
      type: "indicator",
      mode: "gauge",
      gauge: {
        axis: { range: [0, 3.6], tickwidth: 0.9, tickcolor: "#e8e8e8" },
        bar: { color: "#e8e8e8" },
        steps: [
          { range: [0, 0.9], color: "#607c77" },
          { range: [0.9,1.8], color: "#d4c96a" },
          { range: [1.8,2.7], color: "#b08335" },
          { range: [2.7,3.6], color: "#9c5151" },
        ]}}];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500, 
      height: 300, 
      margin: { t: 0, b: 0 }, 
      paper_bgcolor: '#e8e8e8',
      plot_bgcolor: '#e8e8e8',
    };
    
    // 6. Use Plotly to plot the gauge data and layout.
Plotly.newPlot("gauge", gaugeTrace, gaugeLayout);

  });
}

  // Initialize the dashboard
  init();