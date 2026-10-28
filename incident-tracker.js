const readline = require("node:readline/promises"); 

const incidentObject1 = {
    id: 214359,
    title: "Remote Code Execution on Database",
    severity: "Critical",
    status: "investigating",
    source: "Firewall",
    description: "On Monday 10/26/2026 at 11:49 pm, a threat actor was able to successfully run code on our database without being logged on likely through a remote code execution vulnerability, system was taken offline and damage has not yet been fully assessed",
    resolved: false
};
const incidentObject2 = {
    id: 176541,
    title: "Suspicious failed logins from IP",
    severity: "Low",
    status: "resolved",
    source: "IDS",
    description: "Firewall detected multiple attempted logins on different accounts from one IP, seemed like someone going login by login typing passwords rather than a brute force or rainbow table attack",
    resolved: true
};
const incidentObject3 = {
    id: 102934,
    title: "Suspected file exfiltration",
    severity: "High",
    status: "contained",
    source: "SIEM",
    description: "File service firewall noticed a significant spike in downloads from one specific IP, server was locked down",
    resolved: true
};
//Creating objects to go into the incident array

const incidents = [incidentObject1, incidentObject2, incidentObject3];

function addIncident() {
    const newIncidentObject = main();
    incidents.push(newIncidentObject);
    return newIncidentObject;
}

async function getNewIncident() {
    const newTitle = await rl.question("Incident Title: ");
    const newId = await rl.question("Incident ID: "); //TESTING TO CHECK ADDING INTO ARRAY/OBJECT, REMOVE LATER AND ADD AUTO ASSIGNED IDS
    const newSeverity = await rl.question("Incident Severity Level, Low, Medium, High, Critical: "); //case sensitive for now
    const newStatus = await rl.question("Incident Status: ");
    const newSource = await rl.question("Incident Source: ");
    const newDesc = await rl.question("Incident Description: ");
    const newResolved = await rl.question("Is Incident Resolved? (yes/no): ");
    rl.close();
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

//const newIncident = await getNewIncident();

//addIncident(
    //incidents,
    //newIncident.id,
    //newIncident.title,
    //newIncident.severity,
    //newIncident.status,
    //newIncident.source,
    //newIncident.description,
    //newIncident.resolved
//);

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


async function main() {
    const newIncident = await getNewIncident();
    console.log(newIncident);
    return newIncident;
}

const newIncidentObject = addIncident();
incidents.push(newIncidentObject);
console.log(incidents);