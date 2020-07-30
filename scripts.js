var newCases = [1,0,0,0,1,0,3,0,0,0,1,1,1,0,3,0,0,1,0,0,0,0,1,0,2,0,0,0,0,0,0,0,19,1,0,18,0,6,0,3,0,0,2,44,21,19,65,0,0,259,224,0,291,277,414,36,0,1822,3551,3355,4777,0,0,16354,20341,0,16420,0,16894,18093,19332,17987,22559,24103,26298,28103,32105,33510,26493,29510,31709,30859,35386,31606,31633,29308,24446,25802,28711,32549,30023,28252,27668,25634,24019,29127,30719,38509,32417,29218,22541,20517,31379,31774,26753,31839,29266,16200,22267,22119,30204,25870,26642,23767,18044,21424,20840,27090,22813,31967,13227,24417,23310,22787,20475,24151,26158,15253,24886,16362,19606,21214,17962,23482,26116,14692,24890,14583,20069,28922,28918,17848,17536,17235,20315,21745,22133,25314,21754,18514,27921,23139,23046,36617,32349,27575,26519,34191,37601,40526,44458,44580,41008,35757,43556,54271,53213,51933,57186,43686,46194,50263,64630,58975,66281,62369,60113,58720,60711,67165,71484,74354,66963,62788,57276,62929,69641,71714,74235,63968];

async function initPlot() {
  // Margins and Svg Dimensions
  var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // Used to parse date when reading data
  //var parseDate = d3.time.format("%d-%b-%y").parse;
  // Generates SVG canvas

  //d3.select('body').selectAll('p').data(data).enter().append('p');
  var data = await d3.csv("https://cors-anywhere.herokuapp.com/https://github.com/nprate2/CS498-Narrative-Vis/blob/master/WHO_covid19_USA.csv")
  .then(function (data) {
    console.log(data)
  });
  var xScaleNC = d3.scaleLinear().domain([0,190]).range([0,width]);
  var yScaleNC = d3.scaleLinear().domain([0,d3.max(data.NewCase)]).range([height,0]);
  // Axes
  d3.select('.chart1').append('g').attr("transform","translate(50,50)")
  .call(d3.axisLeft(yScaleNC).tickFormat(d3.format("~s")));
  d3.select('.chart1').append('g').attr("transform","translate(50,250)")
  .call(d3.axisBottom(xScaleNC).tickFormat(d3.format("~s")));

  // Chart Rects
  d3.select('.chart1').append('g').attr("transform", "translate(50,50)")
  .selectAll("rect").data(newCases).enter().append("rect")
  .attr("x", function(d, i) {return xScaleNC(i)})
  .attr("y", function(d) {return yScaleNC(0)})
  .attr("width", width / 190)
  .attr("height", function(d) { return height - yScaleNC(0)});
  // Animation
  d3.select('.chart1').selectAll("rect")
  .transition().duration(800)
  .attr("y", function(d) { return yScaleNC(d); })
  .attr("height", function(d) { return height - yScaleNC(d); })
  .delay(function(d,i){return(i*100)})

}
