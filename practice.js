console.log("Hello World!");
let hackersFound = 100;
const typeOfHack = "bruteforce";
const hackerCaught = true;
console.log(hackersFound, typeOfHack, hackerCaught);
hackersFound += 100;
console.log(hackersFound + " Warning more hackers found!!!!");
if (hackersFound >= 650) {
    console.log("WARNING TOO MANY HACKERS");
} else if (hackersFound >= 450) {
    console.log("Alarming levels of hackers");
} else {
    console.log("Managable level of hackers");
}
for (let value = 1; value <= 5; value++) {
    console.log(value);
}
while (hackersFound < 800) {
    console.log("Hackers found: " + hackersFound + " working on finding more");
    hackersFound += 75;
}
const incidentFactors = ["amIFired", "financialLosses", "exploits", "vulnerabilities", "whyDidIGetAJobInCybersecurity"];
for (let value0 = 0; value0 < (incidentFactors.length); value0++) {
    console.log(incidentFactors[value0]);
}
incidentFactors.pop();
incidentFactors.push("I love my job");
incidentFactors.push("I wonder whats for dinner");
for (let value0 = 0; value0 < (incidentFactors.length); value0++) {
    console.log(incidentFactors[value0]);
}