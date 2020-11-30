
var container = document.getElementById("mynetwork");
var dot = 'dinetwork {node[shape=circle]; 1 -> 2 [label="B>B, L"]; 2 -> 3[label="B>B, R"]; 1 -> 1[label="b>a, R|a>a, R"]; 2 -> 2[label="a>a, L"]; 3[ borderWidth=7]}';
var data = vis.parseDOTNetwork(dot);

var options = {
  nodes: {
    shape: "dot",
    size: 50,
    font: {
      size: 32,
    },
    borderWidth: 1,
    shadow: true,
  },
  layout: {
    hierarchical: {
      sortMethod: "directed",
    },
  },
  edges: {
    width: 3,
    length: 190,
    font: {
      size: 16,
    },
    shadow: true,
    color: "blue",
  },
};

var network = new vis.Network(container, data, options);


setInterval(()=>{

  if(isCounting){
var dot1 = 'dinetwork {node[shape=circle]; 1 -> 2 [label="B>B, L"]; 2 -> 3[label="B>B, R"]; 1 -> 1[label="b>a, R|a>a, R"]; 2 -> 2[label="a>a, L"]; 3[ borderWidth=7];';

var data = vis.parseDOTNetwork(dot);
if(isCounting){
  console.log("hola si entro yo");
}
setTimeout(() =>{ 
  dot = dot1+' 1[color=green]; 1->1[color = blue];  1->2[color = blue]}';
  var network = new vis.Network(container, data, options)}, 1000);

setTimeout(() =>{ 
  dot = dot1+'2[color=green]; 2->2[color = blue]; 2->3[color = blue]}'; 
  var network = new vis.Network(container, vis.parseDOTNetwork(dot), options)}, 2000);

setTimeout(() =>{ 
  dot = dot1+'3[color=green]}'; 
  var network = new vis.Network(container, vis.parseDOTNetwork(dot), options)}, 3000);
  }
}, 2000); 

//var network = new vis.Network(container, data, options);