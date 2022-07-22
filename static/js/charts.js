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
      // console.log(metadata);

      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.xray_number == sample);
      var result = resultArray[0];
      // console.log(result)
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
      // console.log(PANEL)
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Edit the keys to capture more detailed information and print each value
      PANEL.append("h6").text(`X-Ray Number: ${result.xray_number}`);
      PANEL.append("h6").text(`Image ID: ${result.image_index}`);
      PANEL.append("h6").text(`Patient ID: ${result.patient_id}`);
      PANEL.append("h6").text(`Gender: ${result.gender}`);
      PANEL.append("h6").text(`Age: ${result.age}`);
      PANEL.append("h6").text(`View Position: ${result.view_position}`);
      PANEL.append("h6").text(`Triage Level: ${result.highest_label}`);
      
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