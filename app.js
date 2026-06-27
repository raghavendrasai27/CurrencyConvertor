const BASE_URL = "https://open.er-api.com/v6/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector(".amount input");
const swapBtn = document.querySelector(".swap-icon");

// 🔥 dynamically generated currency → country mapping
const countryList = {};

// Load currencies from API FIRST
async function loadCurrencies() {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    const currencies = Object.keys(data.rates);

    // build countryList dynamically
    currencies.forEach(code => {
      countryList[code] = code.slice(0, 2);
    });

    populateDropdowns();
    updateExchangeRate();

  } catch (err) {
    console.error("Failed to load currencies:", err);
    msg.innerHTML = "❌ Failed to load currencies";
  }
}

// Populate dropdowns
function populateDropdowns() {
  for (let select of dropdowns) {
    select.innerHTML = "";

    for (let currCode in countryList) {
      let option = document.createElement("option");
      option.value = currCode;
      option.innerText = currCode;

      if (select.name === "from" && currCode === "USD") {
        option.selected = true;
      }

      if (select.name === "to" && currCode === "INR") {
        option.selected = true;
      }

      select.append(option);
    }

    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
      updateExchangeRate();
    });
  }

  updateFlag(fromCurr);
  updateFlag(toCurr);
}

// Update flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let img = element.parentElement.querySelector("img");

  if (img && countryCode) {
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  }
};

// Fetch exchange rate
const updateExchangeRate = async () => {
  let amount = amountInput.value;

  if (amount === "" || amount <= 0) {
    amount = 1;
    amountInput.value = 1;
  }

  msg.innerHTML = "⏳ Fetching latest exchange rate...";

  try {
    const URL = `https://open.er-api.com/v6/latest/${fromCurr.value}`;
    const response = await fetch(URL);

    if (!response.ok) throw new Error("API Error");

    const data = await response.json();

    const rate = data.rates[toCurr.value];

    if (!rate) throw new Error("Invalid currency pair");

    const finalAmount = (amount * rate).toFixed(2);

    msg.innerHTML = `
      <strong>${amount}</strong> ${fromCurr.value} =
      <strong>${finalAmount}</strong> ${toCurr.value}
    `;

  } catch (error) {
    console.log(error);
    msg.innerHTML = "❌ Unable to fetch exchange rate. Please try again.";
  }
};

// Button click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Enter key support
amountInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    updateExchangeRate();
  }
});

// Swap currencies
swapBtn.addEventListener("click", () => {
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;

  updateFlag(fromCurr);
  updateFlag(toCurr);

  updateExchangeRate();
});

// INIT
window.addEventListener("load", loadCurrencies);