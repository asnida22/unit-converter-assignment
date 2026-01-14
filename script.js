const unitData = {
    length: { meters: 1, km: 0.001, feet: 3.28084, inches: 39.3701 },
    mass: { kg: 1, grams: 1000, pounds: 2.20462, ounces: 35.274 },
    temperature: 'temp' // Handled via functions
};

const category = document.getElementById('categorySelect');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const fromInput = document.getElementById('fromInput');
const toOutput = document.getElementById('toOutput');
const favList = document.getElementById('favList');

// Initialize Dropdowns
function populateUnits() {
    const type = category.value;
    const units = type === 'temperature' ? ['Celsius', 'Fahrenheit', 'Kelvin'] : Object.keys(unitData[type]);
    
    const options = units.map(u => `<option value="${u}">${u}</option>`).join('');
    fromUnit.innerHTML = options;
    toUnit.innerHTML = options;
    convert();
}

function convert() {
    const val = parseFloat(fromInput.value);
    if (isNaN(val)) { toOutput.value = ""; return; }

    const type = category.value;
    if (type === 'temperature') {
        toOutput.value = convertTemp(val, fromUnit.value, toUnit.value).toFixed(2);
    } else {
        const result = val * (unitData[type][toUnit.value] / unitData[type][fromUnit.value]);
        toOutput.value = result.toFixed(4);
    }
}

function convertTemp(v, f, t) {
    let c;
    if (f === 'Celsius') c = v;
    else if (f === 'Fahrenheit') c = (v - 32) * 5/9;
    else c = v - 273.15;

    if (t === 'Celsius') return c;
    if (t === 'Fahrenheit') return (c * 9/5) + 32;
    return c + 273.15;
}

// Saving Feature
document.getElementById('saveBtn').addEventListener('click', () => {
    if (!toOutput.value) return;
    const log = `${fromInput.value}${fromUnit.value} = ${toOutput.value}${toUnit.value}`;
    const li = document.createElement('li');
    li.textContent = log;
    favList.prepend(li); // Adds to top of list
});

category.addEventListener('change', populateUnits);
fromInput.addEventListener('input', convert);
fromUnit.addEventListener('change', convert);
toUnit.addEventListener('change', convert);

populateUnits(); // Run once on load