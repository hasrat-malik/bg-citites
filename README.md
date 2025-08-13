# 🌆 bg-cities

**bg-cities** is a Node.js application that fetches a list of cities from an external [pollution data API](https://be-recruitment-task.onrender.com/pollution), validates each city using the [OpenCage Geocoding API](https://opencagedata.com/), and enriches the results with descriptions from [Wikipedia](https://www.wikipedia.org/). The final output is a filtered and enriched list of valid cities with pollution data and contextual information.

---

## 🚀 Features

- Fetches city data from a pollution API
- Validates city names using OpenCage Geocoding
- Normalizes and compares city names with diacritic support
- Retrieves city descriptions from Wikipedia
- Supports pagination and country-based filtering
- In-memory caching for performance optimization

---

## 📦 Prerequisites

Before running the app, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [OpenCage Geocoding API](https://opencagedata.com/) (api key required and also rate limits apply)
- [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) (no key required, but rate limits apply)
- [Pollution data API](https://be-recruitment-task.onrender.com/pollution) (access token required)
- username and password for Pollution data API

---

## 🛠️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/bg-cities.git
   cd bg-cities

2. **Install dependencies**

   ```bash
   npm install

3. **Configure environment variables**
   
    Create a .env file in the root directory:

    ```bash
    OPENCAGE_API_KEY = your_opencage_api_key
    OPENCAGE_API = your_opencage_api
    MOCK_API_ENDPOIND = your_pollution_mock_api
    WIKIPEDIA_API = your_wikipedia_api
    MOCK_API_USERNAME = pollution_api_username
    MOCK_API_PASSWORD = pollution_api_password

4. **Run the app**
   
   ```bash
   npm run dev

---

## 📘 Usage

You can query cities by country code and paginate results:

    const cities = await fetchCities("PL", 1, 10);
    console.log(cities);


Each city record includes:

- name: City name
- country: Country name
- pollution: Pollution data
- description: Wikipedia summary

---

## 🧠 Technologies Used

- Node.js
- Express.js
- TypeScript
- Celeberate
- Axios
- Mock Pollution API
- OpenCage API
- Wikipedia API
- In-memory caching

