function openCases() {
    let numCases = parseInt(document.getElementById("quantity").value, 10);
    let caseType = document.getElementById("Case").value;

    if (isNaN(numCases) || numCases <= 0) {
        console.log("Invalid input. Please enter a valid number.");
        return;
    }

    const dropOdds = {
        "Mil-Spec Grade": 79.92, // Dark blue
        "Restricted": 15.98, // Purple
        "Classified": 3.2, // Hot Pink
        "Covert": 0.64, // Red
        "Exceedingly Rare": 0.26 // GOLD GOLD GOLD!!!!
    };

    const results = {
        "Mil-Spec Grade": 0,
        "Restricted": 0,
        "Classified": 0,
        "Covert": 0,
        "Exceedingly Rare": 0
    };

    function getRandomDrop() {
        let rand = Math.random() * 100;
        let cumulative = 0;
        for (const rarity in dropOdds) {
            cumulative += dropOdds[rarity];
            if (rand < cumulative) {
                return rarity;
            }
        }
    }

    for (let i = 0; i < numCases; i++) {
        const drop = getRandomDrop();
        results[drop]++;
    }

    let casePrices = { // these are prices of both the case and the key combined*
        "Gallery_c": 3.46,
        "Kilowatt_c": 3.31,
        "weapon_c3": 11.37,
        "wildfre_c": 5.85,
        "weapon_c2": 16.09,
        "breakout_c": 22.74
    };

    let moneySpent = casePrices[caseType] ? numCases * casePrices[caseType] : 0;
    let totalValue = calculateTotalValue(results);
    let profit = totalValue - moneySpent;
    let profitPercent = (totalValue - moneySpent) / (moneySpent) * 100;

    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `<h3>Simulation Results for ${numCases} cases:</h3><br/>`;
    outputDiv.innerHTML += `<p>Money spent: $${moneySpent.toFixed(2)}</p><br/>`;
    outputDiv.innerHTML += `<p>Total value of items*: $${totalValue.toFixed(2)}</p><br/>`;
    outputDiv.innerHTML += `<p>Profit/Loss: <span style="color: ${profit >= 0 ? 'green' : 'red'};">$${profit.toFixed(2)}</span> or <span style="color: ${profitPercent >= 0 ? 'green' : 'red'};">${profitPercent.toFixed(2)}%</span></p><br/>`;

    for (const rarity in results) { // just for some text formatting so it looks nicer
        let rarityColor = "";
        
        switch (rarity) {
            case "Mil-Spec Grade":
                rarityColor = "blue";
                break;
            case "Restricted":
                rarityColor = "purple";
                break;
            case "Classified":
                rarityColor = "hotpink";
                break;
            case "Covert":
                rarityColor = "red";
                break;
            case "Exceedingly Rare":
                rarityColor = "gold";
                break;
        }
    
        outputDiv.innerHTML += `<p style="color: ${rarityColor};">${rarity}: </p><p>${results[rarity]}</p><br/>`;
    }

    // Add startext
    document.getElementById("startext").innerHTML = `<p>*The value of items can vary A LOT, due to stuff like the specific skin and/or gun, float values, patterns, market trends, availability etc. The total value is approximate and not always accurate.</p> </br>
    <p>*Average ROI is the ROI I got from the sources I linked in the README, not a calculated ROI.<p>`;

    calculateROI(results, caseType, numCases);
}

function calculateTotalValue(results) {
    const itemValues = {
        "Mil-Spec Grade": 0.50,   // Please note these prices can depend on stuff like float values, specific gun, market trends, availability, etc.
        "Restricted": 3.00,  
        "Classified": 15.00, 
        "Covert": 80.00,   
        "Exceedingly Rare": 1100.00 // some golds can be under 500, some can be over 2000, it really depends, might add a skin system or float value system that changes the price of these.
    };

    let totalValue = 0;
    for (const rarity in results) {
        totalValue += results[rarity] * itemValues[rarity];
    }
    return totalValue;
}

function calculateROI(results, caseType, numCases) {
    let caseROI = {
        "Gallery_c": 112.8,
        "Kilowatt_c": 72.43,
        "weapon_c3": 77.43,
        "wildfre_c": 67.89,
        "weapon_c2": 80.06,
        "breakout_c": 36.02
    };

    let expectedROI = caseROI[caseType] || 0;

    let casePrices = { 
        "Gallery_c": 3.46,
        "Kilowatt_c": 3.31,
        "weapon_c3": 11.37,
        "wildfre_c": 5.85,
        "weapon_c2": 16.09,
        "breakout_c": 22.74
    };

    let moneySpent = casePrices[caseType] ? numCases * casePrices[caseType] : 0;

    let actualTotalValue = calculateTotalValue(results);  

    let actualROI = ((actualTotalValue - moneySpent) / moneySpent) * 100;

    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML += `<p>Average ROI*: ${expectedROI.toFixed(2)}%</p><br/>`;
    outputDiv.innerHTML += `<p>Actual ROI: <span style="color: ${actualROI >= 0 ? 'green' : 'red'};">${actualROI.toFixed(2)}%</span></p><br/>`;
}


document.getElementById("Case").addEventListener("change", function() {
    let numCases = parseInt(document.getElementById("quantity").value, 10);
    let caseType = document.getElementById("Case").value;

    let casePrices = { 
        "Gallery_c": 3.46,
        "Kilowatt_c": 3.31,
        "weapon_c3": 11.37,
        "wildfre_c": 5.85,
        "weapon_c2": 16.09,
        "breakout_c": 22.74
    };

    let moneySpent = casePrices[caseType] ? numCases * casePrices[caseType] : 0;
    document.getElementById("output").innerHTML = `<p>Money spent: $${moneySpent.toFixed(2)}</p><br/>`;
    document.getElementById("startext").innerHTML = `<p>*The value of items can vary A LOT, due to stuff like the specific skin and/or gun, float values, patterns, market trends, availability etc. The total value is approximate and not always accurate.</p> </br>
    <p>*Average ROI is the ROI I got from the sources I linked in the README, not a calculated ROI.<p>`;
    openCases();
});
