function loadLayout() {
    const full_Name = `SaiyedAsma`;
    const citizenCountry = `Canada`;
    const userName = `saiyedas`;
    const myId = `991578249`;
    const myProgram = `Computer System Technology-Software Development and Network Engineering`;

    // Update header and footer with user details
    document.getElementById('hT').innerHTML = `Winter 2023/Assignment-2 ${full_Name} from ${citizenCountry}`;
    document.querySelector('footer').innerHTML = `My username: ${userName} / My ID: ${myId} / My Program: ${myProgram}`;

    // Retrieve college name from localStorage
    const collegeNameLoc = localStorage.getItem("collegeName");

    // Fetch college details from JSON file
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '../json/colleges.json', true);
    xhttp.send();
    xhttp.onload = function() {
        const collegeDetails = JSON.parse(this.responseText);
        let output = "";
        let outputCourses = "";

        // Loop to display college details and courses
        for (let co of collegeDetails) {
            if (co.collegeName === collegeNameLoc) {
                outputCourses = co.courses.map(course => `<p class="courses" id="${course}">${course}</p>`).join('');
                output += `
                    <div class="college" id="${co.collegeName}">
                        <p class="description">${co.description}</p>
                        <p class="coursesTitle">Courses in ${co.collegeName}</p>
                        <p>${outputCourses}</p>
                    </div>`;
            }
        }

        document.querySelector('.collegeDetails').innerHTML = output;
        document.getElementById('clName').innerHTML = collegeNameLoc;
    }
}

function collegeDetails(btn) {
    const collegeName = btn.id;
    localStorage.setItem('collegeName', collegeName);
    window.location.href = '../pages/college.html';
}

function previousPage() {
    window.location.href = '../pages/city.html';
}
