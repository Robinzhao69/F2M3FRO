const uitvoer = document.getElementById('uitvoer');
let dataObject;

function uitvoeren(){
    uitvoer.innerHTML = `<div>%${dataObject[0].tijd} </div>`;
}

function starten(){  
    dataObject = energieData;
    uitvoeren();
}

document.addEventListener('DOMContentloaded', starten)