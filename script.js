const ALPHABET = ['a', 'b']
const LOADED = 'cargado!'
const WAIT = 'Esperando...'
let isCounting = false
let line = []
let caretpos = 0 // posicion carrete (creo)
let initx = true
var container = document.getElementById("mynetwork");
var dot = 'dinetwork {node[shape=circle]; 1 -> 2 [label="B, B, L"]; 2 -> 3[label="B, B, R"]; 1 -> 1[label="b, a, R|a, a, R"]; 2 -> 2[label="a, a, L"]; 3[ borderWidth=7]}';
var data = vis.parseDOTNetwork(dot);
var dot1 = " ";

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

begin = () => {
    init()
}


setCaret = () => {

    const digitBlockWidth = 80
    const caretWidth = 50
    let caretLeft = 0

    if (!initx) {
        caretLeft =
            caretpos * digitBlockWidth + 10
    } else {
        caretLeft = digitBlockWidth * (document.getElementById('string').value.length - 1) + 15
        initx = false
    }
    document.querySelector('.caret').style.left = `${caretLeft}px`
}


init = () => {
    isCounting = false
    line = []

    let re = new RegExp('^[a|b]+$')
    const str = document.getElementById('string').value

    
    if (!re.test(str)) { //valida
        alert('no valida')
        return
    }
    line = " "+str+" ";
    
    const parent = document.querySelector('.digit-list')
    for (let i = 0; i < str.length+2; i++) {
        let child = document.createElement("div")
        child.classList.add("digit")
        parent.appendChild(child)
    }

    
    document.querySelectorAll('.digit').forEach((block, inx) => {
        window.setTimeout(() => {
            block.innerHTML = line[inx]
        }, 200 * inx)
    })

    caretpos = Math.floor(Math.random() * document.getElementById('string').value.length);

    setCaret()

    
    setStatus(LOADED);
    window.setTimeout(() => {
        start()
    }, 3000)
}


reload = () => {
    document.querySelector('.status').innerHTML = WAIT
    document.querySelector('.caret').style.left = '10px'
    initx = true
    document.getElementById('string').value = ""
    caretpos = 0
    var cell = document.getElementById("digit-list");

    
    if (cell.hasChildNodes()) {
        while (cell.childNodes.length >= 1) {
            cell.removeChild(cell.firstChild);
         dot = 'dinetwork {node[shape=circle]; 1 -> 2 [label="B, B, L"]; 2 -> 3[label="B, B, R"]; 1 -> 1[label="b, a, R|a, a, R"]; 2 -> 2[label="a, a, L"]; 3[ borderWidth=7]}';
        var network = new vis.Network(container, data, options);
        }
    }

    if (isCounting) {
        return
    }
}


setStatus = (status, delay = 1200) => {
    window.setTimeout(() => {
        document.querySelector('.status').innerHTML = status
    }, delay)
}


start = () => {
    
    dot1 = 'dinetwork {node[shape=circle]; 1 -> 2 [label="B, B, L"]; 2 -> 3[label="B, B, R"];  2 -> 2[label="a, a, L"]; 3[ borderWidth=7];';

    var data = vis.parseDOTNetwork(dot);
    isCounting = true
    
    x = 0;
    document.querySelectorAll('.digit').forEach((block, inx) => {
        window.setTimeout(() => {
            document.querySelector('.status').innerHTML = 'moviendo la cinta...'
            setStatus('leyendo cinta...', 1100)
            caretpos = inx;
            console.log('b'.includes(line[inx]));
            setCaret()
            if ('b'.includes(line[inx])) {
        // Pintando estado 1      
                window.setTimeout(() =>{ 
                dot = dot1+' 1 -> 1[label="b, a, R"]; 1[color=green]; 1->1[color = green];  1->2[color = blue]}';
                var network = new vis.Network(container, vis.parseDOTNetwork(dot), options)}, 1800);
         //Sobreescribiendo
                setStatus('sobreescribiendo a ', 1800)
                line[inx] = 'a'
                window.setTimeout(() => {
                    block.innerHTML = 'a'
                }, 1800)
            } else {

                window.setTimeout(() =>{ 
                dot = dot1+' 1 -> 1[label="a, a, R"]; 1[color=green]; 1->1[color = green];  1->2[color = blue]}';
                var network = new vis.Network(container, vis.parseDOTNetwork(dot), options)}, 1800);
                setStatus('', 1800)
            }
        }, 2500 * inx)
        x++;
    })

    window.setTimeout(() => {
        document.querySelector('.status').innerHTML = 'Completado.'
        document.querySelector('.caret').style.left = '10px'
        isCounting = false
    }, 2500 * document.getElementById('string').value.length - 1)
}
