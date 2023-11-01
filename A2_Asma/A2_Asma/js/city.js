function loadLayout() {
    const full_Name = `SaiyedAsma`;
    const citizenCountry = `Canada`;
    const userName = `saiyedas`;
    const myId = `991578249`;
    const myProgram = `Computer System Technology-Software Development and Network Engineering`;

    document.getElementById('hT').innerHTML = `Winter 2023 Assignment #2 for ${full_Name} from ${citizenCountry}`;
    document.querySelector('footer').innerHTML = `My Login: ${userName} / My ID: ${myId} / My Program: ${myProgram}`;

    const cityNameLoc = localStorage.getItem("cityName");

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '../json/cities.json', true);
    xhttp.send();
    xhttp.onload = function() {
        const data = JSON.parse(this.responseText);
        let output = "";
        let outputColleges = "";

        for (let d of data) {
            if (d.cityName == cityNameLoc) {
                outputColleges = "";
                if (!d.colleges || d.colleges.length == 0) {
                    output += `
                        <div class="city" id="${d.cityName}">
                            <h4 class="subtitle">Description</h4>
                            <p class="description">${d.description}</p>
                            <h4 class="subtitle">Coordinate</h4>
                            <p class="subtitle">Colleges in ${d.cityName}</p>
                            <p class="noCol">Sorry, no college at here.</p>
                        </div>`;
                } else {
                    for (let col of d.colleges) {
                        outputColleges += `
                            <button class="collegeBtn" id="${col}" onclick="collegeDetails(this)"> ${col}</button>`;
                    }
                    output += `
                        <div class="city" id="${d.cityName}">
                            <h4 class="subtitle">Description</h4>
                            <p class="description">${d.description}</p>
                            <h4 class="subtitle">Coordinate</h4>
                            <p class="subtitle">Colleges in ${d.cityName}</p>
                            <p class="colleges">${outputColleges}</p>
                        </div>`;
                }
            }
        }
        document.querySelector('.cityDetails').innerHTML = output;
        document.getElementById('cityName').innerHTML = cityNameLoc;
    }

    fetch(`https://date.nager.at/api/v2/publicholidays/2020/CA`)
        .then(res => res.json())
        .then(JSONholidays => {
            const provAbbreviation = localStorage.getItem('provinceAbbreviation');
            const filteredHolidays = JSONholidays.filter(h => !h.counties || h.counties.includes(`CA-${provAbbreviation}`));
            const outputHolidays = filteredHolidays.map(fh => `
                <div class="holiday">
                    <p>${fh.name}</p>
                    <p>Date:${fh.date}<p>
                </div>
                <hr>`).join('');
            document.querySelector('.holidays').innerHTML = outputHolidays;
        })
        .catch(err => alert("No holidays found"));
}

function collegeDetails(btn) {
    const collegeName = btn.id;
    localStorage.setItem('collegeName', collegeName);
    window.location.href = '../pages/college.html';
}

function previousPage() {
    window.location.href = '../pages/province.html';
}
