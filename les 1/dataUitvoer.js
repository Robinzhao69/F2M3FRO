const uitvoer = document.getElementById('uitvoer');
let dataObject;
const jsonKnop = document.getElementById('haalJSON');
const urlJson = 'https://gist.githubusercontent.com/Theo-denBlanken/193d989a2aab328f847f4357e7171dc5/raw/1ca3b05253dee0dac348b9ded4ada8a64d97ff5e/huisDataa.json';

jsonKnop.addEventListener('click', () => {
    jsonKnop.style.display = 'none';
    const vraagServer = new XMLHttpRequest();
    vraagServer.onreadystatechange = () => {
        if( vraagServer.readyState==4 && vraagServer.status==200) {
            dataObject = JSON.parse( vraagServer.responseText);
            uitvoeren();
        }
    }
    vraagServer.open('GET', urlJson, true);
    vraagServer.send();
})

function geefDagWeek(num){
    switch (num){
        case 0: return 'zondag'; break;
        case 1: return 'maandag'; break;
        case 2: return 'dinsdag'; break;
        case 3: return 'woensdag'; break;
        case 4: return 'donderdag'; break;
        case 5: return 'vrijdag'; break;
        case 6: return 'zaterdag'; break;

        default: return num;
    }
}

function maandNaam(num){
    switch (num){
        case 0: return 'januari'; break;
        case 1: return 'februari'; break;
        case 2: return 'maart'; break;
        case 3: return 'april'; break;
        case 4: return 'mei'; break;
        case 5: return 'juni'; break;
        case 6: return 'juli'; break;
        case 7: return 'augustus'; break;
        case 8: return 'september'; break;
        case 9: return 'oktober'; break;
        case 10: return 'november'; break;
        case 11: return 'december'; break;

        default: return num;
    }    
}

function maakDatum(num){
    if(typeof(num) == 'string') {
        num = Date.parse(num);
    }

    let datum = new Date(num);

    let dagWeek = datum.getDay();
    let dagMaand = datum.getDate();
    let maand = datum.getMonth();
    let jaar = datum.getFullYear();
    let minuten = datum.getMinutes();
    if( minuten < 10){
        minuten = '0' + minuten;
    }
    let uren = datum.getHours();
    if( uren < 10){
        uren = '0' + uren;
    }
    

    return `${geefDagWeek(dagWeek)} <br>
    ${dagMaand} ${maandNaam(maand)} ${jaar} ${uren}:${minuten}`;

}

function uitvoeren(){
    let html = "";
    dataObject.forEach( obj => {
        html += `<div class="rij">`;
        html += `<div>${ maakDatum(obj.tijd)}</div>`
        html += `<div>${obj.tempBuiten} &deg;C</div>`
        html += `<div>${obj.tempBinnen} &deg;C</div>`
        html += `<div>${obj.tempGewenst} &deg;C</div>`
        if( obj.tempGewenst > obj.tempBinnen ) {
            html += `<div> <img class="icon" src="icons/vlam.svg" alt="CV aan"> </div>`
        } else{
            html += `<div> <img class="icon" src="icons/vlamUIt.svg" alt="CV uit"> </div>`
        }
        if( obj.lichtKamer) {
            html += `<div> <img class="icon" src="icons/lampAan.svg" alt="lamp aan"> </div>`
        } else{
            html += `<div> <img class="icon" src="icons/lampUIt.svg" alt="lampUit"> </div>`
        }
        if( obj.lichtBuiten) {
            html += `<div> <img class="icon" src="icons/lampAan.svg" alt="lamp aan"> </div>`
        } else{
            html += `<div> <img class="icon" src="icons/lampUIt.svg" alt="lampUit"> </div>`
        }
        
        html += "</div>"
    });
    uitvoer.innerHTML = html;

    // uitvoer.innerHTML = `<div>%${dataObject[0].tijd} </div>`;
    // uitvoer.innerHTML = `<div>%${dataObject[1].tempBuiten} </div>`;
}

function starten(){  
    dataObject = energieData;
    uitvoeren();
}

document.addEventListener('DOMContentLoaded', starten);