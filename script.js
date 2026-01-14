const units = {
    length: { meters: 1, kilometers: 0.001, miles: 0.000621, feet: 3.28084 },
    mass: { grams: 1, kilograms: 0.001, pounds: 0.002204, ounces: 0.03527 },
    temp: 'special' // Temp requires formulas, not just multipliers
};

let currentCat = 'length';

function updateCategory(cat) {
    currentCat = cat;
    const fromSelect = document.getElementById('fromUnit');
    const toSelect = document.getElementById('toUnit');
    
    // Toggle active button UI
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase().includes(cat));
    });

    // Clear and fill dropdowns
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    
    const options = cat === 'temp' ? ['Celsius', 'Fahrenheit', 'Kelvin'] : Object.keys(units[cat]);
    
    options.forEach(unit => {
        fromSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        toSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    });
}

document.getElementById('convertBtn').onclick = () => {
    const val = parseFloat(document.getElementById('inputValue').value);
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;

    if (isNaN(val)) {
        alert("Oops! Please enter a valid number.");
        return;
    }

    let result;
    if (currentCat === 'temp') {
        result = convertTemp(val, from, to);
    } else {
        const inMeters = val / units[currentCat][from];
        result = inMeters * units[currentCat][to];
    }

    document.getElementById('resultText').innerText = result.toFixed(4);
};

function convertTemp(v, f, t) {
    if (f === t) return v;
    let celsius;
    if (f === 'Celsius') celsius = v;
    else if (f === 'Fahrenheit') celsius = (v - 32) * 5/9;
    else celsius = v - 273.15;

    if (t === 'Celsius') return celsius;
    if (t === 'Fahrenheit') return (celsius * 9/5) + 32;
    return celsius + 273.15;
}

document.getElementById('saveBtn').onclick = () => {
    const res = document.getElementById('resultText').innerText;
    if (res === "0") return;
    const li = document.createElement('li');
    li.className = 'saved-item';
    li.innerText = `⭐ ${res} (${document.getElementById('toUnit').value})`;
    document.getElementById('savedList').appendChild(li);
};

// Initialize
updateCategory('length');