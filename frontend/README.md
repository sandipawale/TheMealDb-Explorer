# 🍽️ TheMealDB Explorer

A complete full-stack recipe explorer application built using **React + Vite (Frontend)** and **Node.js + Express (Backend)**.  
The app fetches real-time data from **TheMealDB public API** and provides a rich user experience to explore recipes, discover random dishes, view ingredients, and watch cooking videos.

---

## 🚀 Features

✔ **Search Recipes** — Search meals by name  
✔ **Browse Categories** — Filter meals like Chicken, Seafood, Dessert, etc.  
✔ **Random Meal Generator** — “I’m feeling hungry 🍽️” gives a *different* meal every click  
✔ **Recipe Details Page** — Ingredients + Instructions + YouTube cooking video  
✔ **Smart Backend Caching** — Reduced API calls (except random meal)  
✔ **Responsive UI** — Works on mobile & desktop  
✔ **Clean RESTful Endpoints** — Proper request structure & error handling

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Axios |
| Backend | Node.js, Express |
| Cache | In-Memory (LRU + TTL) |
| API Provider | [TheMealDB API](https://www.themealdb.com/api.php) |

---

## 🏛️ Architecture Overview

Frontend (React + Axios)
│
▼
Backend (Express + Cache)
│
▼
External API (TheMealDB)

yaml
Copy code

### 💡 Caching Strategy

| API Feature | Cache? | Why |
|-------------|--------|-----|
| Random Meal | ❌ No | Should always return a new dish |
| Categories | ✔ Yes | Rarely changes |
| Search Meals | ✔ Yes | Frequent repeated queries |
| Meal By ID | ✔ Yes | Details reused when reopened |
| Meals By Category | ✔ Yes | List rarely changes |

> 🧠 **Random meals are intentionally NOT cached** to keep experience fun & surprising!

---

## 📁 Project Structure

TheMealDB-Explorer/
│
├── backend/
│ ├── src/
│ │ ├── routes/
│ │ │ └── mealRoutes.js
│ │ ├── services/
│ │ │ └── mealService.js
│ │ ├── utils/
│ │ │ └── cache.js
│ │ ├── app.js
│ │ └── server.js
│ └── package.json
│
└── frontend/
├── src/
│ ├── components/
│ ├── api/
│ ├── App.jsx
│ ├── main.jsx
│ └── styles.css
└── package.json

yaml
Copy code

---

## 🛠️ How to Run Locally

### 🔧 Backend Setup (Node + Express)

```bash
cd backend
npm install
npm run dev     # or npm start
Backend will start at:
📌 http://localhost:5000

🌐 Frontend Setup (React + Vite)
bash
Copy code
cd frontend
npm install
npm run dev
Frontend will start at:
📌 http://localhost:5173

🔗 Available Backend API Endpoints
Method	Endpoint	Description
GET	/api/meals/search?name=pizza	Search meals by name
GET	/api/categories	Get all categories
GET	/api/categories/:c/meals	Get meals under a category
GET	/api/meals/random	Fetch random meal (not cached)
GET	/api/meals/:id	Get recipe details by ID

🎥  UI Screenshots

🧠 Design Highlights
🔹 Backend acts as a middleware to secure and optimize API calls
🔹 Custom cache improves loading speed and reduces API hits
🔹 Follows REST standards for clean API structure
🔹 Responsive UI made with modern design trends
🔹 Error handling for missing queries, invalid IDs, and API failures

💡 Future Enhancements
🚀 Add Favorites using Local Storage
🔐 Authentication + User Saved Recipes
📱 Offline Mode (Service Workers)
💨 Replace memory cache with Redis in production
🌙 Add Dark Mode toggle

👨‍💻 Author
Sandip Awale
📩 (Add your email here)
🔗 (Add your LinkedIn here)

Special credits to TheMealDB for providing open recipe data ❤️