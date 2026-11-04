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
    id: 3,
    title: "Suspected file exfiltration",
    severity: "High",
    status: "contained",
    source: "SIEM",
    description: "File service firewall noticed a significant spike in downloads from one specific IP, server was locked down",
    resolved: true
};
//Creating objects to go into the incident array

const incidents = [incidentObject1, incidentObject2, incidentObject3];

async function addIncident(incidents) {
    const newIncidentObject = await getNewIncident(incidents);
    incidents.push(newIncidentObject);
}

async function getNewIncident(incidents) {
    let newTitle = "" //Variables must be set outside the loops and be set with let to allow for changing the values
    let newId = (incidents.length + 1)
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
    
    while (true) {
        newSeverity = (await rl.question("Incident Severity Level, Low, Medium, High, Critical: "));
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
        newStatus = await rl.question("Incident Status: ");
        if (newStatus.trim() === ""){
            console.log("Please type an answer in the field") 
        }
        else {
            break
        }
    }
    while (true) {
        newSource = await rl.question("Incident Source: ");
        if (newSource.trim() === ""){
            console.log("Please type an answer in the field")
        }
        else {
            break
        }
    }
    while (true) {
        newDesc = await rl.question("Incident Description: ");
        if (newDesc.trim() === ""){
            console.log("Please type an answer in the field")   
        }
        else {
            break
        }
    }
    while (true) {
        newResolved = await rl.question("Is Incident Resolved? (yes/no): ");
        newResolved = newResolved.trim().toLowerCase();
        if (newResolved === ""){
            console.log("Please type an answer in the field")
            
        }
        else if (newResolved !== "yes" && newResolved !== "no")
            console.log("Invalid Value")
        else {
            if (newResolved === "yes") {
                newResolved = true
            }
            else {
                newResolved = false
            }
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
