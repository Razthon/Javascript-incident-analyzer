const readline = require("node:readline/promises"); 

const incidentObject1 = {
    id: 1,
    title: "Remote Code Execution on Database",
    severity: "Critical",
    status: "investigating",
    source: "Firewall",
    description: "On Monday 10/26/2026 at 11:49 pm, a threat actor was able to successfully run code on our database without being logged on likely through a remote code execution vulnerability, system was taken offline and damage has not yet been fully assessed",
    resolved: false
};
const incidentObject2 = {
    id: 2,
    title: "Suspicious failed logins from IP",
    severity: "Low",
    status: "resolved",
    source: "IDS",
    description: "Firewall detected multiple attempted logins on different accounts from one IP, seemed like someone going login by login typing passwords rather than a brute force or rainbow table attack",
    resolved: true
};
const incidentObject3 = {
    id: 4,
    title: "Suspected file exfiltration",
    severity: "High",
    status: "contained",
    source: "SIEM",
    description: "File service firewall noticed a significant spike in downloads from one specific IP, server was locked down",
    resolved: true
};
//Creating objects to go into the incident array

const incidents = [incidentObject1, incidentObject2, incidentObject3];

async function addIncident() {
    let loopGood = "no"
    while (loopGood === "no") {
        const newIncidentObject = await getNewIncident();
        console.log(newIncidentObject)
        loopGood = (await rl.question("Is this correct? (yes/no): "))
        if (loopGood.toLowerCase() ==="yes") {
            incidents.push(newIncidentObject);
        }
        else if (loopGood.toLowerCase() === "no")
            console.log("Okay, let's try again!")
        else {
            console.log("Sorry an error occured please try again!")
        }
    }
    
    
}

async function getNewIncident(incidents) {
    let newTitle = "" //Variables must be set outside the loops and be set with let to allow for changing the values
    let newId = 0
    let newSeverity = ""
    let newStatus = ""
    let newSource = ""
    let newDesc = ""
    let newResolved = ""
    
    while (true) {
        newTitle = await rl.question("Incident Title: ");
        if (newTitle.trim() === ""){
            console.log("Please type an answer in the field")
        }
        else {
            break
        }
    }
    let highestId = 0;
    for (let count = 0; count < incidents.length; count++) {
        if (incidents[count].id > highestId) {
            highestId = incidents[count].id;
        }
        //newId = count + 1 //For loop to count objects in the incidents array, likely inefficient but oh well it works fine.
    }
    newId = highestId +1;
    while (true) {
        newSeverity = (await rl.question("Incident Severity Level (Low, Medium, High, Critical): "));
        newSeverity = newSeverity.trim().toLowerCase();
        newSeverity = newSeverity.charAt(0).toUpperCase() + newSeverity.slice(1);
        if (newSeverity === ""){
            console.log("Please type an answer in the field")
        }
        else if (newSeverity !== "Low" && newSeverity !== "Medium" && newSeverity !== "High" && newSeverity !== "Critical") {
            console.log("Invalid Value")
        }
        else {
            break
        }
    }
    while (true) {
        newStatus = await rl.question("Incident Status (Open, Investigating, Contained, Resolved): ");
        newStatus = newStatus.trim().toLowerCase();
        newStatus = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
        if (newStatus === ""){
            console.log("Please type an answer in the field")
        }
        else if (newStatus !== "Open" && newStatus !== "Investigating" && newStatus !== "Contained" && newStatus !== "Resolved") {
            console.log("Invalid Value")
        }
        else {
            if (newStatus === "Resolved") {
                newResolved = true
            }
            break
        }
    }
    while (true) {
        newSource = await rl.question("Incident Source (Firewall, IDS, SIEM, User report, Edr, Other): ");
        newSource = newSource.trim().toLowerCase();
        newSource = newSource.charAt(0).toUpperCase() + newSource.slice(1);
        if (newSource === ""){
            console.log("Please type an answer in the field")
        }
        else if (newSource !== "Firewall" && newSource !== "Ids" && newSource !== "Siem" && newSource !== "User report" && newSource !== "Edr" && newSource !== "Other") {
            console.log("Invalid Value")
        }
        else {
            break
        }
    }
    while (true) {
        newDesc = await rl.question("Incident Description: ");
        newDesc = newDesc.trim()
        if (newDesc === ""){
            console.log("Please type an answer in the field")   
        }
        else if (newDesc.length < 20) {
            console.log("Please add more context (at least 20 characters)")
        }
        else {
            break
        }
    }
    


    const newIncidentObject = {
        id: newId,
        title: newTitle,
        severity: newSeverity,
        status: newStatus,
        source: newSource,
        description: newDesc,
        resolved: newResolved
    };
    return newIncidentObject;

}


function incidentCounter(incidents) {
    const incidentCount = incidents.length;
    return incidentCount;
}

function incidentSeverityChecker(incidents) {
    let criticalIncidents = 0;
    let highIncidents = 0;
    let mediumIncidents = 0;
    let lowIncidents = 0;
    for (let value = 0; value < incidents.length; value++) {

    if (incidents[value].severity === "Critical") {
        criticalIncidents += 1;
    }
    else if (incidents[value].severity === "High") {
        highIncidents += 1;
    }    
    else if (incidents[value].severity === "Medium") {
        mediumIncidents += 1;
    }   
    else if (incidents[value].severity === "Low") {
        lowIncidents += 1;
    }
    else {
        console.log("Fire someone in data entry they broke one of these");
    }
}
const incidentSeverityObject = {
    critical: criticalIncidents,
    high: highIncidents,
    medium: mediumIncidents,
    low: lowIncidents
};
return incidentSeverityObject;
}
const severities = incidentSeverityChecker(incidents);
console.log("Number of critical incidents: " + severities.critical + "\nNumber of high incidents: " + severities.high + "\nNumber of medium incidents " + severities.medium + "\nNumber of low incidents: " + severities.low);
const incidentCount = incidentCounter(incidents);
console.log("Total incidents: " + incidentCount);


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});




//getNewIncident();
//console.log(incidents);


async function main(programActive, incidents) {
    console.log("Welcome to the incident tracker program!")
    while (programActive === true) {
        const menuOption = await rl.question("Please type '1' to add a new incident or '2' to view existing incidents. Type '3' to exit:");
        if (menuOption === "1") {
            await addIncident(incidents);//doesn't need output, the array gets updated inside the function and that saves universally
            
        }
        else if (menuOption === "2") {
            console.log("Current Incidents: "); 
            console.log(incidents);
        }
        else if (menuOption === "3") {
        programActive = false;   
        }
        else {
            console.log("Invalid Answer, Please Try Again");
        }
    }
    rl.close();
}
const programActive = true
main(programActive);
