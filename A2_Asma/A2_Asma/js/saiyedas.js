let provinceObj, provName, flag, desc, cities = [], size;

function loadLayout(){
    // User's details
    const full_Name = `SaiyedAsma`;
    const citizenCountry = `Canada`;
    const userName = `saiyedas`;
    const myId = `991578249`;
    const myProgram = `Computer System Technology-Software Development and Network Engineering`;

    // Update header and footer with user details
    document.getElementById('hT').innerHTML = `Winter 2023/Assignment-2 ${full_Name} from ${citizenCountry}`;
    document.querySelector('footer').innerHTML = `My username: ${userName} / My ID: ${myId} / My Advanced Diploma is: ${myProgram}`;

    // Fetch province details from the JSON file
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/A2_Asma/json/provinces.json', true);
    xhttp.send();
    xhttp.onload = function(){
        const provinces = JSON.parse(this.responseText);
        let output1 = "";

        for(let p of provinces){
            output1 +=`
                <div class="province button" id="${p.pName}" onclick="provinceDetails(this)">
                    <img src="${p.flag}" alt="${p.flag}">
                    <p class="prname">${p.pName}</p>
                </div>`; 
            
            // Logging data (You may want to remove these in production)
            console.log('size of cities', size);
            console.log('province name', p.pName);
            console.log('cities', p.cities);
            console.log('city 1', p.cities[1]);
            console.log('province obj', provinceObj);
        }

        // Update the HTML with the province details
        document.querySelector('.provinceList').innerHTML = output1;
    }    
}

function provinceDetails(btn) {
    const provinceName = btn.id;

    // Save the province name to localStorage
    localStorage.setItem('province', provinceName);

    // Redirect to the detailed page for the province
    window.location.href = 'pages/province.html';
}

// Call the loadLayout function to display the provinces when the script runs
loadLayout();
