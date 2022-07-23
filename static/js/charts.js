function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    console.log("selected")
    // Use the list of sample names to populate the select options
    d3.json("../json/combined_test.json").then((dataset) => {
      var sampleNames = dataset.names;
      console.log(sampleNames[0])
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      // buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    // buildCharts(newSample);
    
  }
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("../json/combined_test.json").then((data) => {
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
      PANEL.append("h6").text(`Image ID: ${result.image_index}`);
      PANEL.append("h6").text(`Patient ID: ${result.patient_id}`);
      PANEL.append("h6").text(`Gender: ${result.gender}`);
      PANEL.append("h6").text(`Age: ${result.age}`);
      PANEL.append("h6").text(`View Position: ${result.view_position}`);
      PANEL.append("h6").text(`Triage Level: ${result.highest_label}`);
      
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
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("combined_test.json").then((data) => {
      // 3. Create a variable that holds the samples array. 
      let samples = data.all_dx
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      // 5. Create a variable that holds the first sample in the array.
      let result = resultArray[0];
      
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      // let otu_ids = result.otu_ids;
      // let otu_labels = result.otu_labels;
      // let sample_values = result.sample_values;
  
      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
  
      // var yticks = otu_ids.slice(0,10).reverse().map((id)=> "OTU "+ id);
      // var xvals = sample_values.slice(0,10).reverse();
      // var labels = otu_labels.slice(0,10).reverse();
  
      // 8. Create the trace for the bar chart. 
      // var barData = [{
        // x: xvals,
        // y: yticks,
        // text: labels,
        // orientation: "h",
        // type:"bar"
      // }];
      // 9. Create the layout for the bar chart. 
      // var barLayout = {
        /// title: "<b>Top 10 Bacterial Species Found</b>",
        // xaxis: {title: "Number of Sequences Observed"},
        // yaxis: {title: "Operational Taxonomic Unit"}
      // };
      // 10. Use Plotly to plot the data with the layout. 
      // Plotly.newPlot("bar", barData, barLayout);
  
      // 1. Create the trace for the bubble chart.
      // var bubbleData = [{
        // x: otu_ids,
        // y: sample_values,
        // text: otu_labels,
        // mode: "markers",
        // marker: {
          // color: otu_ids,
          // size: sample_values,
          // sizeref: 0.2,
          // sizemode: "area"
        // }
      // }];
  
      // 2. Create the layout for the bubble chart.
      // var bubbleLayout = {
        // title: "<b>Relative Abundance of Bacterial Species</b>",
        // showlegend: false,
        // xaxis: {title: "Operational Taxonomic Unit (OTU)"},
        // yaxis: {title: "Number of Sequences Observed"},
        // height: 800,
        // width: 1150
      // };
  
      // 3. Use Plotly to plot the data with the layout.
      // Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  
      // 4. Create a variable that holds the washing frequency.
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var filteredMetadata = metadata.filter(sampleObj => sampleObj.id == sample);
      var metaResult = filteredMetadata[0];
      var inclassint = metaResult.highest_class
      var hiclass = parseFloat(inclassint).toFixed(2);
  
      // 5. Create the trace for the gauge chart.
      var gaugeData = [
          {
          domain: { x: [0, 1], y: [0, 1] },
           value: hiclass,
          title: { text: ""},
          title: { text: "<b>Belly Button Wash Frequency</b><br>Scrubs per Week</br>" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [0, 3.6] }, 
            bar: { color: "black" },
            steps: [
              { range: [0, 0.9], color: "red" },
              { range: [0.9, 1.8], color: "yellow" },
              { range: [1.8, 2.7], color: "green" },
              { range: [2.7, 3.6], color: "green" },
            ],
          }
        } 
      ];
      
      // 5. Create the layout for the gauge chart.
      var gaugeLayout = { 
        width: 450,
        height: 450,
        margin: { t: 0, b: 0 },
      };
  
      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    
    });
  }