let provAbbreviation; // Store abbreviation value

function loadLayout() {
    const full_Name = 'SaiyedAsma';
    const citizenCountry = 'Canada';
    const userName = 'saiyedas';
    const myId = '991578249';
    const myProgram = 'Computer System Technology-Software Development and Network Engineering';

    // Update header and footer with user details
    document.getElementById('hT').innerHTML = `Winter 2023/Assignment-2 ${full_Name} from ${citizenCountry}`;
    document.querySelector('footer').innerHTML = `My username: ${userName} / My ID: ${myId} / My Program: ${myProgram}`;

    // Retrieve province name from localStorage
    const pName = localStorage.getItem('province');

    // Fetch province details from JSON file
    const xhttpProv = new XMLHttpRequest();
    xhttpProv.open('GET', '../json/provinces.json', true);
    xhttpProv.send();
    xhttpProv.onload = function() {
        const provJSONdata = JSON.parse(this.responseText);
        let output1 = '';
        let output2 = '';

        // Loop to display province details and cities
        for (let p of provJSONdata) {
            if (p.pName === pName) {
                output1 = `
                    <img id="imgflag" src="${p.flag}" alt="Flag of ${p.pName}"/>
                    <p class="provDescription">${p.description}</p>`;
                output2 = p.cities.map(city => `
                    <div class="city button" id="${city}" onclick="cityDetails(this)">
                        <p class="ctname">${city}</p>
                    </div>
                `).join('');
            }
        }

        document.querySelector('.provDetails').innerHTML = output1;
        document.querySelector('.cityList').innerHTML = output2;
        document.getElementById('pName').innerHTML = pName;
    }
}

function cityDetails(btn) {
    const ctName = btn.id;
    localStorage.setItem('cityName', ctName);
    window.location.href = '../pages/city.html';
}

function previousPage() {
    window.location.href = '../index.html';
}
