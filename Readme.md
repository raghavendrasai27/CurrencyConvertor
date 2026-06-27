Currency Converter Web App

A simple and responsive Currency Converter built using HTML, CSS, and JavaScript.
It fetches real-time exchange rates using the Open Exchange Rate API and allows users to convert between any two currencies instantly.

🚀 Features
🌍 Live currency exchange rates
🔄 Swap currencies with one click
🇺🇳 Automatic country flag updates
⌨️ Enter key support for quick conversion
📱 Responsive and modern UI
⚡ Fast API-based conversion (real-time data)
🛠️ Technologies Used
HTML5
CSS3
JavaScript (ES6)
Fetch API
Open Exchange Rates API
Flag API (https://flagsapi.com)
📂 Project Structure
currency-converter/
│
├── index.html        # Main HTML file
├── style.css         # Styling file
├── app.js            # JavaScript logic
└── README.md         # Project documentation
🔧 How It Works
On page load, the app fetches all available currencies from the API.
Dropdowns are dynamically populated with currency codes.
When user selects currencies or enters amount:
Exchange rate is fetched from API
Conversion is calculated instantly
Flags update automatically based on selected currency.
Swap button exchanges "From" and "To" currencies.
▶️ How to Run Locally

Clone the repository:

git clone https://github.com/raghavendrasai27/CurrencyConvertor.git

Open the project folder:

cd currency-converter
Run index.html in your browser:
Double click OR
Use Live Server extension (recommended)
🌐 API Used

Exchange Rates:

https://open.er-api.com/v6/latest/USD

Flags:

https://flagsapi.com/{countryCode}/flat/64.png
📸 Preview

(Add screenshot here if you want)

📌 Future Improvements
Searchable currency dropdown
Historical exchange rate charts
Dark mode support
Currency favorite list
🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

📄 License

This project is open-source and free to use.